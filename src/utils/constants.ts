import UkIcon from "src/components/icons/UkIcon";
export interface RouteItem {
  title: string;
  path: string;
  Icon: any;
}

export const Languages = [
  {
    key: "en",
    icon: UkIcon,
    text: "English",
  },
  {
    key: "vi",
    icon: UkIcon,
    text: "Vietnamese",
  },
];

export enum StepOfRetrievePassword {
  SUBMIT_EMAIL = 1,
  VERIFY_EMAIL = 2,
  CHANGE_PASSWORD = 3,
}

export const REGEX = {
  PHONE: /^((\+)33|0)[1-9](\d{2}){4}$/,
  PHONE_E164_CONVENTION: /^(\+\d{1,2})\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  HAS_UPPER_CASE: /[A-Z]/,
  HAS_LOWER_CASE: /[a-z]/,
  HAS_NUMBER: /[0-9]/,
  HAS_SYMBOLS: /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/,
};
