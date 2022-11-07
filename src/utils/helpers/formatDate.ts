import moment from "moment";

export const DATE_FORMATS = {
  DEFAULT: "dddd, DD/MM/YYYY",
};

export const formatDate = (
  date: string,
  formatType: keyof typeof DATE_FORMATS = "DEFAULT"
) => {
  return moment(date).format(DATE_FORMATS[formatType]);
};
