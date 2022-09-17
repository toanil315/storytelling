import i18next from "i18next";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(i18next.t("validation.userName.invalid"))
    .required(i18next.t("validation.userName.required")),
  password: yup.string().required(i18next.t("validation.password.required")),
});
