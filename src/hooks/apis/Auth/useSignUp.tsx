import { UserRegister } from "src/data-model/UserTypes";
import { useMutation } from "react-query";
import { authService } from "src/services/AuthServices";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useSignUp = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authService.register,
    {
      onSuccess: () => {
        // Invalidate and refetch
        router.push(Path.login);
        toast.success(t("toast.success.register"));
      },
      onError: (error: any) => {
        if (error.response.data.error.message) {
          toast.error(error.response.data.error.message);
        } else toast.error(t("toast.error.register"));
      },
    }
  );

  return {
    register: async (registerData: UserRegister) => {
      const result = await mutate(registerData);
      return result;
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export default useSignUp;
