import i18next from "i18next";
import yupGlobal from "../yupGlobal";

export const userInformationSchema = yupGlobal.object().shape({
  email: yupGlobal
    .string()
    .email(i18next.t("validation.userName.invalid"))
    .required(i18next.t("validation.userName.required")),
  fullName: yupGlobal.string().required(i18next.t("validation.name.required")),
  address: yupGlobal
    .string()
    .required(i18next.t("validation.address.required")),
  phone: yupGlobal
    .string()
    .isPhone()
    .required(i18next.t("validation.phoneNumber.required")),
  occupation: yupGlobal
    .string()
    .required(i18next.t("validation.occupation.required")),
  dateOfBirth: yupGlobal
    .string()
    .required(i18next.t("validation.dateOfBirth.required")),
  backSideOfIdentityCard: yupGlobal
    .string()
    .required(i18next.t("validation.backSideOfIdentityCard.required")),
  frontSideOfIdentityCard: yupGlobal
    .string()
    .required(i18next.t("validation.frontSideOfIdentityCard.required")),
});

export const changePasswordSchema = yupGlobal.object().shape({
  oldPassword: yupGlobal
    .string()
    .min(6, i18next.t("validation.password.min"))
    .required(i18next.t("validation.password.required"))
    .isPassword(),
  newPassword: yupGlobal
    .string()
    .min(6, i18next.t("validation.password.min"))
    .required(i18next.t("validation.password.required"))
    .isPassword(),
  confirmNewPassword: yupGlobal
    .string()
    .required(i18next.t("validation.confirmPassword.required"))
    .oneOf(
      [yupGlobal.ref("newPassword"), null],
      i18next.t("validation.password.notMatch")
    ),
});
