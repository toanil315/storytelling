import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ChangePasswordType } from "src/data-model/UserTypes";
import { userServices } from "src/services/UserServices";
import { clearTokens } from "src/utils/axios/helper";
import { Path } from "src/utils/Path";

const useChangePassword = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutate, isLoading, isError } = useMutation(
    userServices.changePassword,
    {
      onSuccess: () => {
        clearTokens();
        router.push(Path.login);
        toast.success(t("toast.success.changePassword"));
      },
      onError: () => {
        toast.error(t("toast.error.changePassword"));
      },
    }
  );
  return {
    changePassword: (newPassword: ChangePasswordType) => {
      return mutate(newPassword);
    },
    isLoading,
    isError,
  };
};

export default useChangePassword;
