export interface UseQueryResponse<T> {
  data?: T;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface UseInfinityQueryResponse<T> extends UseQueryResponse<T> {
  hasNextPage?: boolean;
  fetchNextPage: any;
}
