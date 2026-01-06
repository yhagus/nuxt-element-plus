declare global {
  interface APIResponseBody<T> {
    data: T[];
    meta: APIResponseMeta;
  }
  interface APIResponseMeta {
    total: number;
    lastPage: number;
    currentPage: number;
    limit: number;
    prev: number;
    next: number;
  }
  interface User {
    id: string;
    email: string;
    role: {
      permissions: {
        module: string;
        manage: boolean;
        read: boolean;
        create: boolean;
        update: boolean;
        delete: boolean;
      }[];
    };
  }
}

export {};
