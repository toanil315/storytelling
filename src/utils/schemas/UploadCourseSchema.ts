import i18next from "i18next";
import yupGlobal from "../yupGlobal";

export const upLoadInformationSchema = yupGlobal.object().shape({
  title: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.title")),
  description: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.description")),
  thumbnail: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.thumbnail")),
  category: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.category")),
  price: yupGlobal
    .number()
    .typeError(i18next.t("validation.uploadCourse.price.invalid"))
    .positive(i18next.t("validation.uploadCourse.price.min")),
});

export const newSectionSchema = yupGlobal.object().shape({
  title: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.title")),
});

export const newLectureSchema = yupGlobal.object().shape({
  title: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.title")),
  video: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.lecture.video")),
  thumbnail: yupGlobal
    .string()
    .required(i18next.t("validation.uploadCourse.thumbnail")),
});
