declare global {
  interface APIResponseBody<T> {
    data: T[];
    meta: APIResponseMeta;
  }
  interface APIResponseMeta {
    current_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
    last_page: number;
    total: number;
  }
  type AkgProfilePaginationResponse = APIResponseBody<AkgProfile>;
}

export {};
