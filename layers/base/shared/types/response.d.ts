declare global {
  interface APIResponseBody<T> {
    data: T;
    meta: APIResponseMeta;
  }
  interface APIResponseMeta {

  }
}

export {};
