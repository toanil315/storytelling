import i18next from "i18next";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(i18next.t("validation.userName.invalid"))
    .required(i18next.t("validation.userName.required")),
  password: yup.string().required(i18next.t("validation.password.required")),
});

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required(i18next.t("validation.firstName.required")),
  lastName: yup.string().required(i18next.t("validation.lastName.required")),
  email: yup
    .string()
    .email(i18next.t("validation.userName.invalid"))
    .required(i18next.t("validation.userName.required")),
  password: yup
    .string()
    .min(6, i18next.t("validation.password.min"))
    .required(i18next.t("validation.password.required")),
  confirmPassword: yup
    .string()
    .required(i18next.t("validation.confirmPassword.required"))
    .oneOf(
      [yup.ref("password"), null],
      i18next.t("validation.password.notMatch")
    ),
});
