import { axiosClient } from "src/utils/axios";
import { UserLogin, UserRegister, UserType } from "src/data-model/UserTypes";
import { CustomAxiosResponse } from "src/utils/types/CustomAxiosResponse";

export const authService = {
  login: (loginData: UserLogin): Promise<CustomAxiosResponse<any>> => {
    return axiosClient.post("/login", loginData);
  },

  register: (registerData: UserRegister): Promise<CustomAxiosResponse<any>> => {
    return axiosClient.post("/register", registerData);
  },

  getMe: (): Promise<CustomAxiosResponse<UserType>> => {
    return axiosClient.get("/me");
  },

  logout: () => {
    return axiosClient.get("/logout");
  },
};
