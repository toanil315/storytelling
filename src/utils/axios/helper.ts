import { localStorageClient } from "../localStorageClient";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import axios from "axios";

export const getNewAccessToken = async (mode: "server" | "client") => {
  const currentRefreshToken =
    mode === "client"
      ? (localStorageClient.readValue(REFRESH_TOKEN) as string)
      : Cookies.get(REFRESH_TOKEN);

  const result = await axios.post("/v1/auth/refresh-token", {
    refreshToken: currentRefreshToken,
  });

  return result.data.accessToken;
};

export const setAccessToken = (
  mode: "server" | "client",
  accessToken: string
) => {
  if (mode === "client") {
    localStorageClient.setValue(ACCESS_TOKEN, accessToken);
  } else {
    const date = new Date();
    // simulate accessToken will expire after 1 minute
    let accessTokenExpireDate = new Date(date.getTime() + 60 * 1000);
    Cookies.set(ACCESS_TOKEN, accessToken, {
      expires: accessTokenExpireDate,
    });
  }
};
