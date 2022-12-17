import { useQuery } from "react-query";
import { UserDetail, UserType } from "src/data-model/UserTypes";
import { authService } from "src/services/AuthServices";
import { ACCESS_TOKEN, QUERY_KEYS } from "src/utils/constants";
import { localStorageClient } from "src/utils/localStorageClient";

const useUser = (): {
  user?: UserDetail;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_ME,
    authService.getUserDetail,
    {
      enabled: Boolean(localStorageClient.readValue(ACCESS_TOKEN)),
    }
  );

  return {
    user: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useUser;
