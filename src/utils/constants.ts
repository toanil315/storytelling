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
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
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
  ACCESS_TOKEN: 3600000,
  REFRESH_TOKEN: 604800000,
};

export const QUERY_KEYS = {
  GET_ME: "GET_ME",
  GET_CATEGORY: "GET_CATEGORY",
  GET_COURSES: "GET_COURSES",
  GET_COURSE_DETAIL: "GET_COURSE_DETAIL",
  GET_COURSES_BY_INSTRUCTOR: "GET_COURSES_BY_INSTRUCTOR",
  GET_SECTIONS: "GET_SECTIONS",
  GET_LECTURES_IN_SECTION: "GET_LECTURES_IN_SECTION",
  GET_LECTURE_DETAIL: "GET_LECTURE_DETAIL",
  GET_COMMENTS_OF_VIDEO: "GET_COMMENTS_OF_VIDEO",
  GET_NOTIFICATION_BY_USER_ID: "GET_NOTIFICATION_BY_USER_ID",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  GET_HASH_TAGS: "GET_HASH_TAGS",
  SEARCH_COURSES: "SEARCH_COURSES",
  COUNT_LIKE_OF_VIDEO: "COUNT_LIKE_OF_VIDEO",
  CHECK_IS_LIKED_VIDEO: "CHECK_IS_LIKED_VIDEO",
  GET_PURCHASED_HISTORY: "GET_PURCHASED_HISTORY",
  GET_MY_PURCHASED_COURSES: "GET_MY_PURCHASED_COURSES",
  GET_REVENUE_OF_THE_MONTH: "GET_REVENUE_OF_THE_MONTH",
  GET_LIST_FOLLOW_BY_USER: "GET_LIST_FOLLOW_BY_USER",
  GET_ATTENDANCE_BY_MONTH: "GET_ATTENDANCE_BY_MONTH",
  CHECK_FOLLOWED_OR_NOT: "CHECK_FOLLOWED_OR_NOT",
  CHECK_FINISHED_COURSE: "CHECK_FINISHED_COURSE",
  PUBLISH_COURSE: "PUBLISH_COURSE",
};

export const USER_ROLES = {
  USER: "USER",
  AUTHOR: "INSTRUCTOR",
};

const dev = process.env.NODE_ENV !== "production";
export const BASE_HOST = process.env.NEXT_PUBLIC_MY_HOST;
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_JAVA_URL = process.env.NEXT_PUBLIC_API_WS_URL;

export const DEFAULT_PAGINATION_SIZE = {
  COURSES_SIZE: 16,
  NOTIFICATIONS_SIZE: 12,
  COMMENTS: 10,
};

export const FALL_BACK_IMAGE_URL = "/assets/image-fallback.png";

export enum NOTIFICATIONS_TYPES {
  COMMENT_VIDEO = "COMMENT_VIDEO",
  EMOTION_REACT_VIDEO = "EMOTION_REACT_VIDEO",
  USER_SUBSCRIBE_COURSE = "USER_SUBSCRIBE_COURSE",
  USER_FOLLOW_INSTRUCTOR = "USER_FOLLOW_INSTRUCTOR",
}

export const QUERY_PARAMS_FOR_SEARCH_COURSE = {
  query: "key",
  category: "category",
  hashtag: "tag",
  minPrice: "lteq",
  maxPrice: "gteq",
};

export enum MIN_MAX_PRICE_OF_COURSES {
  MIN = 0,
  MAX = 500000,
}

export enum PAYMENT_STATUS {
  SUCCESS = "00",
}

export enum CONDITIONS_IN_WITH_AUTH {
  PURCHASED_COURSE = "PURCHASED_COURSE",
}

export enum ERRORS {
  "SERVER_ERROR" = 500,
  "BAD_REQUEST" = 400,
  "NOT_FOUND" = 404,
  "UN_AUTHORIZE" = 403,
}

export enum ERRORS_DETAIL {
  "SERVER_ERROR" = "500 - Internal Server Error.",
  "BAD_REQUEST" = "400 - Bad Request",
  "NOT_FOUND" = "404 - The requested resource does not exist.",
  "UN_AUTHORIZE" = "403 - User is not permitted to acess requested resource.",
}
