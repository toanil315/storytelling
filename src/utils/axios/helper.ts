import { localStorageClient } from "../localStorageClient";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, EXPIRE_TIME, REFRESH_TOKEN } from "../constants";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Path } from "../Path";
import { toast } from "react-toastify";
import i18next from "i18next";
import Router from "next/router";

let refreshTokenHandler: Promise<AxiosResponse<any, any>> | undefined =
  undefined;

export const getNewAccessToken = (mode: "server" | "client") => {
  const currentRefreshToken =
    mode === "client"
      ? (localStorageClient.readValue(REFRESH_TOKEN) as string)
      : Cookies.get(REFRESH_TOKEN);

  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
    refreshToken: currentRefreshToken,
  });
};

export const setAccessToken = (
  mode: "server" | "client",
  {
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }
) => {
  if (mode === "client") {
    localStorageClient.setValue(ACCESS_TOKEN, accessToken);
    localStorageClient.setValue(REFRESH_TOKEN, refreshToken);
  }

  const date = new Date();
  Cookies.set(ACCESS_TOKEN, accessToken, {
    expires: new Date(date.getTime() + EXPIRE_TIME.ACCESS_TOKEN),
  });
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    expires: new Date(date.getTime() + EXPIRE_TIME.REFRESH_TOKEN),
  });
};

export const clearTokens = () => {
  localStorageClient.removeValue(ACCESS_TOKEN);
  localStorageClient.removeValue(REFRESH_TOKEN);
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};

export const handleRefreshToken = async (
  originalConfig: any,
  axiosInstance: AxiosInstance,
  mode: "server" | "client"
) => {
  originalConfig._retry = true;
  Cookies.remove(ACCESS_TOKEN);
  try {
    if (!refreshTokenHandler) {
      refreshTokenHandler = getNewAccessToken(mode);
    }
    const result = await refreshTokenHandler;

    const tokens = result
      ? {
          accessToken: result.data.data.token,
          refreshToken: result.data.data.refreshToken,
        }
      : undefined;
    if (tokens) {
      setAccessToken(mode, tokens);
      return axiosInstance(originalConfig);
    }
  } catch (error) {
    toast.error(i18next.t("toast.error.refreshTokenFailed") as string);
    if (typeof window !== "undefined") {
      Router.push(Path.login);
    }
  } finally {
    refreshTokenHandler = undefined;
  }
};
