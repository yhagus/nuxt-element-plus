import type { HTTPMethod } from 'h3';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { reactive, ref } from 'vue';

export interface UseForm<DefaultResponseType = any> {
  _method?: HTTPMethod;
  submit: <APIResponseType = DefaultResponseType>(
    method: HTTPMethod,
    url: NitroFetchRequest,
    options?: NitroFetchOptions<NitroFetchRequest>
  ) => Promise<APIResponseType>;
  post: <APIResponseType = DefaultResponseType>(
    url: NitroFetchRequest,
    options?: NitroFetchOptions<NitroFetchRequest>
  ) => Promise<APIResponseType>;
  patch: <APIResponseType = DefaultResponseType>(
    url: NitroFetchRequest,
    options?: NitroFetchOptions<NitroFetchRequest>
  ) => Promise<APIResponseType>;
  put: <APIResponseType = DefaultResponseType>(
    url: NitroFetchRequest,
    options?: NitroFetchOptions<NitroFetchRequest>
  ) => Promise<APIResponseType>;
  delete: <APIResponseType = DefaultResponseType>( // Changed from 'remove' to 'delete' based on usage
    url: NitroFetchRequest,
    options?: NitroFetchOptions<NitroFetchRequest>
  ) => Promise<APIResponseType>;
  processing: boolean;
  errors: any;
  response: Record<string, any> | null;
  [key: string]: any;
}

export default function useForm<TData extends object, DefaultResponseType = any>(
  initialData: TData,
  formOptions?: {
    alwaysFormData?: boolean;
  },
): TData & UseForm<DefaultResponseType> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl;
  const accessToken = useCookie<string>(ACCESS_TOKEN);
  const refreshToken = useCookie<string>(REFRESH_TOKEN);
  const form = reactive({
    ...initialData,

    response: null as DefaultResponseType | any | null,
    errors: {} as any,
    processing: false,

    submit: async <APIResponseType = DefaultResponseType>(
      method: HTTPMethod,
      url: NitroFetchRequest,
      options?: NitroFetchOptions<NitroFetchRequest>,
    ): Promise<APIResponseType> => {
      const isMultipart = ref<boolean>(false);
      const formDataBody: FormData = new FormData();

      form.processing = true;
      form.response = null;
      form.errors = {};

      const excludedKeys: string[] = [
        'errors',
        'processing',
        'response',
        'post',
        'patch',
        'put',
        'delete',
        'submit',
        'rules',
      ];

      // let requestBody: FormData | Record<string, any>;
      const plainBodyObject: Record<string, any> = {};

      // Create a copy of form data to avoid mutating the reactive form
      const formData = { ...toRaw(form) } as Record<string, any>;

      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key) && !excludedKeys.includes(key)) {
          let value: any = formData[key];

          if (typeof value === 'string') {
            value = value.trim();
          }

          if (value instanceof File || (Array.isArray(value) && value.some(item => item instanceof File))) {
            isMultipart.value = true;
          }

          if (value instanceof File) {
            formDataBody.append(key, value);
          }
          else if (Array.isArray(value) && value.every(item => item instanceof File)) {
            value.forEach((file: File) => formDataBody.append(`${key}[]`, file));
          }
          else if (Array.isArray(value)) {
            value.forEach((item: any, index: number) => {
              if (typeof item === 'object' && item !== null && !(item instanceof File)) {
                // Handle nested objects in arrays
                Object.keys(item).forEach((subKey) => {
                  const fieldName = `${key}[${index}][${subKey}]`;
                  formDataBody.append(fieldName, String(item[subKey] || ''));
                });
              }
              else {
                const fieldName = `${key}[${index}]`;
                formDataBody.append(fieldName, String(item));
              }
            });
            plainBodyObject[key] = value;
          }
          else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
            // Handle nested objects
            Object.keys(value).forEach((subKey) => {
              const fieldName = `${key}[${subKey}]`;
              if (Array.isArray(value[subKey])) {
                value[subKey].forEach((arrayItem: any, arrayIndex: number) => {
                  const arrayFieldName = `${fieldName}[${arrayIndex}]`;
                  formDataBody.append(arrayFieldName, String(arrayItem));
                });
              }
              else {
                formDataBody.append(fieldName, String(value[subKey] || ''));
              }
            });
            plainBodyObject[key] = value;
          }
          else {
            if (value !== null && value !== undefined) {
              formDataBody.append(key, String(value));
            }
            else if (value === null) {
              formDataBody.append(key, '');
            }
            plainBodyObject[key] = value;
          }
        }
      }

      const fetchOptions: NitroFetchOptions<NitroFetchRequest> = {
        ...options,
        method,
        baseURL: baseUrl,
        body: formOptions?.alwaysFormData || isMultipart.value ? formDataBody : plainBodyObject,
        retry: 1,
        retryStatusCodes: [401],
        onRequest({ options }) {
          if (accessToken.value) {
            options.headers.set('authorization', `Bearer ${accessToken.value}`);
          }
        },
        onRequestError() {
          form.processing = false;
        },
        onResponse(context) {
          if (context.response.ok) {
            form.response = context.response._data;
          }
          form.errors = {};
          form.processing = false;
          if (options?.onResponse && typeof options.onResponse === 'function') {
            options.onResponse(context);
          }
        },
        async onResponseError(context) {
          // Only set errors if response data exists and contains error information
          if (context.response._data && typeof context.response._data === 'object') {
            const responseData = context.response._data;

            // Safeguard: Only assign error-related data, never form field data
            if (responseData.errors) {
              form.errors = responseData.errors;
            }
            else if (responseData.message || responseData.error) {
              form.errors = responseData;
            }
            else {
              // If response doesn't have standard error structure,
              // only set errors property to avoid overriding form data
              form.errors = responseData;
            }
          }
          else {
            form.errors = {};
          }
          form.processing = false;

          if (options?.onResponseError && typeof options.onResponseError === 'function') {
            options.onResponseError(context);
          }
          switch (context.response.status) {
            case 401:
              await api.auth.refresh({
                onResponse(context) {
                  if (context.response.ok) {
                    accessToken.value = context.response._data.access_token;
                    refreshToken.value = context.response._data.refresh_token;
                    refreshCookie(ACCESS_TOKEN);
                    refreshCookie(REFRESH_TOKEN);
                  }
                },
              });
              break;
          }
        },
      };

      return $fetch<APIResponseType>(url, fetchOptions);
    },

    post: <APIResponseType = DefaultResponseType>(
      url: NitroFetchRequest,
      options?: NitroFetchOptions<NitroFetchRequest>,
    ) => {
      return form.submit<APIResponseType>('POST', url, options);
    },

    patch: <APIResponseType = DefaultResponseType>(
      url: NitroFetchRequest,
      options?: NitroFetchOptions<NitroFetchRequest>,
    ) => {
      return form.submit<APIResponseType>('PATCH', url, options);
    },

    put: <APIResponseType = DefaultResponseType>(
      url: NitroFetchRequest,
      options?: NitroFetchOptions<NitroFetchRequest>,
    ) => {
      return form.submit<APIResponseType>('PUT', url, options);
    },

    delete: <APIResponseType = DefaultResponseType>(
      url: NitroFetchRequest,
      options?: NitroFetchOptions<NitroFetchRequest>,
    ) => {
      return form.submit<APIResponseType>('DELETE', url, options);
    },
  });

  return form as TData & UseForm<DefaultResponseType>;
}
