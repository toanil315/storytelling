import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, ERROR_CODE } from "../constants";
import { localStorageClient } from "../localStorageClient";
import { getNewAccessToken, setAccessToken } from "./helper";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosServer = axios.create({
  baseURL: `${BASE_URL}`,
});

export const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
});

// Add a request interceptor
axiosServer.interceptors.request.use(
  async function (config) {
    // add access token to header before request is sent
    const accessToken = Cookies.get(ACCESS_TOKEN);
    config.headers = config.headers ?? {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use(
  async function (config) {
    // add access token to header before request is sent
    const accessToken = localStorageClient.readValue(ACCESS_TOKEN);
    config.headers = config.headers ?? {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken as string}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosServer.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    if (error.response) {
      if (
        error.response?.status === ERROR_CODE.UNAUTHORIZED &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        try {
          const accessToken = await getNewAccessToken("server");
          if (accessToken) {
            setAccessToken("server", accessToken);
            return axiosServer(originalConfig);
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    if (error.response) {
      if (
        error.response?.status === ERROR_CODE.UNAUTHORIZED &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        try {
          const accessToken = await getNewAccessToken("client");
          if (accessToken) {
            setAccessToken("client", accessToken);
            return axiosServer(originalConfig);
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);
