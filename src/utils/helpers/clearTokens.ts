import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { localStorageClient } from "../localStorageClient";

const clearTokens = () => {
  localStorageClient.removeValue(ACCESS_TOKEN);
  localStorageClient.removeValue(REFRESH_TOKEN);
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};

export default clearTokens;
