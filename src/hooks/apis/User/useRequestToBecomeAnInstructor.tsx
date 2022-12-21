import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { userServices } from "src/services/UserServices";

const useRequestToBecomeAnInstructor = () => {
  const { t } = useTranslation();
  const { mutate, isSuccess, isLoading } = useMutation(
    userServices.requestToBecomeAnInstructor,
    {
      onSuccess: () => {
        toast.success(t("toast.success.requestToBecomeAnInstructor"));
      },
      onError: () => {
        toast.error(t("toast.error.requestToBecomeAnInstructor"));
      },
    }
  );

  return {
    requestToBecomeAnInstructor: () => {
      return mutate();
    },
    isLoading,
    isSuccess,
  };
};

export default useRequestToBecomeAnInstructor;
