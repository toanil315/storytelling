import { UserLogin } from "src/data-model/UserTypes";
import { useMutation, useQueryClient } from "react-query";
import { authService } from "src/services/AuthServices";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { localStorageClient } from "src/utils/localStorageClient";
import {
  ACCESS_TOKEN,
  EXPIRE_TIME,
  QUERY_KEYS,
  REFRESH_TOKEN,
} from "src/utils/constants";

const useSignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const client = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authService.login,
    {
      onSuccess: (data) => {
        // Set tokens
        const date = new Date();
        const { token, refreshToken } = data.data;
        localStorageClient.setValue(ACCESS_TOKEN, token);
        localStorageClient.setValue(REFRESH_TOKEN, refreshToken);

        Cookies.set(ACCESS_TOKEN, token, {
          expires: new Date(date.getTime() + EXPIRE_TIME.ACCESS_TOKEN),
        });
        Cookies.set(REFRESH_TOKEN, refreshToken, {
          expires: new Date(date.getTime() + EXPIRE_TIME.REFRESH_TOKEN),
        });

        // Get user data
        client.refetchQueries(QUERY_KEYS.GET_ME);

        // Show Toast
        toast.success(t("toast.success.login"));

        // Navigate to prev page
        if (window.history.state && window.history.state.idx > 0) {
          router.back();
        } else {
          router.push(Path.home);
        }
      },
      onError: (error) => {
        toast.error(t("toast.error.login"));
      },
    }
  );

  return {
    login: async (loginData: UserLogin) => {
      return mutate(loginData);
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useSignIn;
