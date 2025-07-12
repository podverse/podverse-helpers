export interface ApiListResponse<T> {
  data: T[];
  meta: {
    page: number;
  };
}
