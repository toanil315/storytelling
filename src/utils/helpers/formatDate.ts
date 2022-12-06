import moment from "moment";

export const DATE_FORMATS = {
  DEFAULT: "dddd, DD/MM/YYYY",
  UPDATE_VIEW: "YYYY-MM-DD HH:mm:ss +0700",
};

export const formatDate = (
  date: string,
  formatType: keyof typeof DATE_FORMATS = "DEFAULT"
) => {
  return moment(date).format(DATE_FORMATS[formatType]);
};
