import { axiosClient } from "src/utils/axios";
import { UserLogin, UserRegister } from "src/data-model/UserTypes";

export const authService = {
  login: (loginData: UserLogin) => {
    return axiosClient.post("/login", loginData);
  },

  register: (registerData: UserRegister) => {
    return axiosClient.post("/register", registerData);
  },

  getMe: () => {
    return axiosClient.get("/me");
  },
};
