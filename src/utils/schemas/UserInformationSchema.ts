import i18next from "i18next";
import yupGlobal from "../yupGlobal";

export const userInformationSchema = yupGlobal.object().shape({
  email: yupGlobal
    .string()
    .email(i18next.t("validation.userName.invalid"))
    .required(i18next.t("validation.userName.required")),
  password: yupGlobal
    .string()
    .required(i18next.t("validation.password.required")),
  name: yupGlobal.string().required(i18next.t("validation.name.required")),
  address: yupGlobal
    .string()
    .required(i18next.t("validation.address.required")),
  phoneNumber: yupGlobal
    .string()
    .isPhone()
    .required(i18next.t("validation.phoneNumber.required")),
});
