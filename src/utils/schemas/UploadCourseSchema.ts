import i18next from "i18next";
import yupGlobal from "../yupGlobal";

export const upLoadInformationSchema = yupGlobal.object().shape({
  name: yupGlobal.string().required(i18next.t("validation.uploadCourse.title")),
  description: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.description")),
  thumbnailUrl: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.thumbnail")),
  categoryTopicId: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.category")),
  price: yupGlobal
    .number()
    .typeError(i18next.t("validation.uploadCourse.price.invalid"))
    .positive(i18next.t("validation.uploadCourse.price.min")),
});

export const newSectionSchema = yupGlobal.object().shape({
  sectionName: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.title")),
});

export const lectureSchema = yupGlobal.object().shape({
  title: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.title")),
  url: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.lecture.video")),
  thumbnailUrl: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.thumbnail")),
  description: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.description")),
});
