import i18next from "i18next";
import yupGlobal from "../yupGlobal";

export const loginSchema = yupGlobal.object().shape({
  email: yupGlobal
    .string()
    .email(i18next.t("validation.userName.invalid"))
    .required(i18next.t("validation.userName.required")),
  password: yupGlobal
    .string()
    .required(i18next.t("validation.password.required")),
});

export const signUpSchema = yupGlobal.object().shape({
  fullName: yupGlobal
    .string()
    .required(i18next.t("validation.fullName.required")),
  email: yupGlobal
    .string()
    .email(i18next.t("validation.userName.invalid"))
    .required(i18next.t("validation.userName.required")),
  password: yupGlobal
    .string()
    .min(6, i18next.t("validation.password.min"))
    .required(i18next.t("validation.password.required")),
  confirmPassword: yupGlobal
    .string()
    .required(i18next.t("validation.confirmPassword.required"))
    .oneOf(
      [yupGlobal.ref("password"), null],
      i18next.t("validation.password.notMatch")
    ),
});

export const forgotPasswordSchemas = {
  submitEmailSchema: yupGlobal.object().shape({
    email: yupGlobal
      .string()
      .email(i18next.t("validation.userName.invalid"))
      .required(i18next.t("validation.userName.required")),
  }),
  verifyEmailSchema: yupGlobal.object().shape({
    verifyCode: yupGlobal
      .string()
      .min(4, i18next.t("validation.verifyCode.max", { length: 4 }))
      .max(4, i18next.t("validation.verifyCode.max", { length: 4 }))
      .required(i18next.t("validation.verifyCode.required")),
  }),
  changePasswordSchema: yupGlobal.object().shape({
    newPassword: yupGlobal
      .string()
      .min(6, i18next.t("validation.password.min"))
      .required(i18next.t("validation.password.required")),
    confirmNewPassword: yupGlobal
      .string()
      .required(i18next.t("validation.confirmPassword.required"))
      .oneOf(
        [yupGlobal.ref("newPassword"), null],
        i18next.t("validation.password.notMatch")
      ),
  }),
};
