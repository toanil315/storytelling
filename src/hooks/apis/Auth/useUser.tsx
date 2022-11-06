import { useQuery } from "react-query";
import { UserType } from "src/data-model/UserTypes";
import { authService } from "src/services/AuthServices";
import { QUERY_KEYS } from "src/utils/constants";

const useUser = (): {
  user?: UserType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    QUERY_KEYS.GET_ME,
    authService.getMe
  );

  return {
    user: data?.data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useUser;
