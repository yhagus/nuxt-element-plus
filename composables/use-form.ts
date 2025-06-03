import type { HTTPMethod } from 'h3';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { reactive, ref } from 'vue';

export interface FormOperations<DefaultResponseType = any> {
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
  delete: <APIResponseType = DefaultResponseType>( // Changed from 'remove' to 'delete' based on usage
    url: NitroFetchRequest,
    options?: NitroFetchOptions<NitroFetchRequest>
  ) => Promise<APIResponseType>;
  processing: boolean;
  errors: Record<string, string[]>;
  response: Record<string, any> | null;
}

export default function useForm<TData extends object, DefaultResponseType = any>(
  initialData: TData,
): TData & FormOperations<DefaultResponseType> {
  const form = reactive({
    ...initialData,

    response: null as DefaultResponseType | any | null,
    errors: {} as Record<string, string[]>,
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
        'delete',
        'submit',
        'rules',
      ];

      let requestBody: FormData | Record<string, any>;
      const plainBodyObject: Record<string, any> = {};

      for (const key in form) {
        if (Object.prototype.hasOwnProperty.call(form, key) && !excludedKeys.includes(key)) {
          let value: any = (form as any)[key];

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
              const fieldName = `${key}[${index}]`;
              if (typeof item === 'object' && item !== null && !(item instanceof File)) {
                formDataBody.append(fieldName, JSON.stringify(item));
              }
              else {
                formDataBody.append(fieldName, String(item));
              }
            });
            plainBodyObject[key] = value;
          }
          else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
            formDataBody.append(key, JSON.stringify(value));
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

      requestBody = isMultipart.value ? formDataBody : plainBodyObject;

      const fetchOptions: NitroFetchOptions<NitroFetchRequest> = {
        ...options,
        method,
        body: requestBody,
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
        onResponseError(context) {
          form.errors = context.response._data;
          if (options?.onResponseError && typeof options.onResponseError === 'function') {
            options.onResponseError(context);
          }
        },
      };

      return (useNuxtApp().$api as typeof $fetch)<APIResponseType>(url, fetchOptions);
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

    delete: <APIResponseType = DefaultResponseType>(
      url: NitroFetchRequest,
      options?: NitroFetchOptions<NitroFetchRequest>,
    ) => {
      return form.submit<APIResponseType>('DELETE', url, options);
    },
  });

  return form as TData & FormOperations<DefaultResponseType>;
}
