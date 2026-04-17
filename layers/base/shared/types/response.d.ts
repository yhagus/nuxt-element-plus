declare global {
  interface APIResponseBody<T> {
    data: T;
    meta: APIResponseMeta;
  }
  interface APIResponseMeta {
    current_page: number;
    total: number;
    per_page: number;
  }
}

export {};
