import i18next from "i18next";
import yupGlobal from "../yupGlobal";

export const upLoadInformationSchema = yupGlobal.object().shape({
  title: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.title")),
  description: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.description")),
});
