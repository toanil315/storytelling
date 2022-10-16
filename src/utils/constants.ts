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

export const ENV_VARIABLES = {
  WS_LOGIN: process.env.NEXT_PUBLIC_WS_LOGIN || "",
  WS_PASS_CODE: process.env.NEXT_PUBLIC_WS_PASS_CODE || "",
  WS_MY_SUB_ID: process.env.NEXT_PUBLIC_WS_MY_SUB_ID || "",
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || "",
};
