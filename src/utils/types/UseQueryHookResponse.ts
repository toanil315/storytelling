export interface UseQueryResponse<T> {
  data?: T;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
