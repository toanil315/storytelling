import { useMutation } from "react-query";
import { authService } from "src/services/AuthServices";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  ResetPasswordType,
  VerifyCodeForgotPassword,
} from "src/data-model/UserTypes";

export const useSubmitEmail = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authService.forgotPassword.enterEmail,
    {
      onSuccess: () => {
        // Invalidate and refetch
        toast.success(t("toast.success.forgotPassword.enterEmail"));
      },
      onError: (error: any) => {
        if (error.response.data.error.message) {
          toast.error(error.response.data.error.message);
        } else toast.error(t("toast.error.forgotPassword.enterEmail"));
      },
    }
  );

  return {
    submitEmail: async (email: string) => {
      const result = await mutate(email);
      return result;
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export const useVerifyCodeForgotPassword = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authService.forgotPassword.verifyCode,
    {
      onSuccess: () => {
        // Invalidate and refetch
        toast.success(t("toast.success.forgotPassword.verifyCode"));
      },
      onError: (error: any) => {
        if (error.response.data.error.message) {
          toast.error(error.response.data.error.message);
        } else toast.error(t("toast.error.forgotPassword.verifyCode"));
      },
    }
  );

  return {
    verifyCode: async (verifyCode: VerifyCodeForgotPassword) => {
      const result = await mutate(verifyCode);
      return result;
    },
    isLoading,
    isError,
    isSuccess,
  };
};

export const useResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    authService.forgotPassword.resetPassword,
    {
      onSuccess: () => {
        // Invalidate and refetch
        router.push(Path.login);
        toast.success(t("toast.success.forgotPassword.resetPassword"));
      },
      onError: (error: any) => {
        if (error.response.data.error.message) {
          toast.error(error.response.data.error.message);
        } else toast.error(t("toast.error.forgotPassword.resetPassword"));
      },
    }
  );

  return {
    resetPassword: async (resetPassword: ResetPasswordType) => {
      const result = await mutate(resetPassword);
      return result;
    },
    isLoading,
    isError,
    isSuccess,
  };
};
