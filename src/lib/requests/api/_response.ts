export interface ApiMessageResponse<> {
  message: string;
};

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    page: number;
  };
}
