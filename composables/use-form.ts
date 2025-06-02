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
  // You might also want methods like 'reset' or 'setData'
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
        'delete', // Changed from 'remove'
        'submit',
        'rules', // Assuming 'rules' might be a property you don't want to submit
      ];

      let requestBody: FormData | Record<string, any>;
      const plainBodyObject: Record<string, any> = {};

      for (const key in form) {
        if (Object.prototype.hasOwnProperty.call(form, key) && !excludedKeys.includes(key)) {
          let value: any = (form as any)[key];

          // Trim strings
          if (typeof value === 'string') {
            value = value.trim();
          }

          // Determine if the request should be multipart
          if (value instanceof File || (Array.isArray(value) && value.some(item => item instanceof File))) {
            isMultipart.value = true;
          }

          // Populate formDataBody and plainBodyObject
          if (value instanceof File) {
            formDataBody.append(key, value);
          }
          else if (Array.isArray(value) && value.every(item => item instanceof File)) {
            value.forEach((file: File) => formDataBody.append(`${key}[]`, file));
          }
          else if (Array.isArray(value)) {
            // Array of other types (including objects, strings, numbers)
            value.forEach((item: any, index: number) => {
              const fieldName = `${key}[${index}]`; // e.g., elements[0], elements[1]
              if (typeof item === 'object' && item !== null && !(item instanceof File)) {
                // **MODIFIED PART: Stringify objects within arrays for FormData**
                formDataBody.append(fieldName, JSON.stringify(item));
              }
              else {
                // For primitives or other non-File, non-object types in the array
                formDataBody.append(fieldName, String(item)); // Ensure it's a string for FormData
              }
            });
            plainBodyObject[key] = value; // Keep original array for plain JSON body
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
        headers: {
          ...(isMultipart.value ? {} : { 'Content-Type': 'application/json' }),
          ...(options?.headers || {}),
        },
      };

      try {
        const nuxtApp = useNuxtApp();
        const data = await (nuxtApp.$api as typeof $fetch)<APIResponseType>(url, fetchOptions);

        form.response = data;
        form.errors = {}; // Clear errors on success
        return data;
      }
      catch (error: any) {
        if (error.data && error.data.errors) {
          form.errors = error.data.errors;
        }
        else if (error.data && typeof error.data === 'object') {
          form.errors = { general: [error.data.message || 'An error occurred.'] };
        }
        else if (error.message) {
          form.errors = { general: [error.message] };
        }
        else {
          form.errors = { general: ['An unknown error occurred.'] };
        }
        form.response = null;
        throw error;
      }
      finally {
        form.processing = false;
      }
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

    delete: <APIResponseType = DefaultResponseType>( // Changed from 'remove'
      url: NitroFetchRequest,
      options?: NitroFetchOptions<NitroFetchRequest>,
    ) => {
      return form.submit<APIResponseType>('DELETE', url, options);
    },
  });

  return form as TData & FormOperations<DefaultResponseType>;
}
