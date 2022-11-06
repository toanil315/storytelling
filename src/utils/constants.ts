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

export enum ERROR_CODE {
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const EXPIRE_TIME = {
  ACCESS_TOKEN: 1800000,
  REFRESH_TOKEN: 2592000000,
};

export const QUERY_KEYS = {
  GET_ME: "GET_ME",
  GET_CATEGORY: "GET_CATEGORY",
  GET_COURSES: "GET_COURSES",
  GET_COURSE_DETAIL: "GET_COURSE_DETAIL",
  GET_SECTIONS: "GET_SECTIONS",
  GET_LECTURES_IN_SECTION: "GET_LECTURES_IN_SECTION",
};

export const USER_ROLES = {
  USER: "USER",
  AUTHOR: "INSTRUCTOR",
};

const dev = process.env.NODE_ENV !== "production";
export const BASE_HOST = process.env.NEXT_PUBLIC_MY_HOST;
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const DEFAULT_PAGINATION_SIZE_IN_PAGES = 16;
