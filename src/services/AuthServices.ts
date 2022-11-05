import { axiosClient } from "src/utils/axios";
import { UserLogin, UserRegister, UserType } from "src/data-model/UserTypes";

export const authService = {
  login: (loginData: UserLogin) => {
    return axiosClient.post("/login", loginData);
  },

  register: (registerData: UserRegister) => {
    return axiosClient.post("/register", registerData);
  },

  getMe: (): Promise<UserType> => {
    return axiosClient.get("/me");
  },

  logout: () => {
    return axiosClient.get("/logout");
  },
};
