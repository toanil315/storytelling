import { axiosClient } from "src/utils/axios";
import {
  ResetPasswordType,
  UserLogin,
  UserRegister,
  UserType,
  VerifyCodeForgotPassword,
} from "src/data-model/UserTypes";
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
    return axiosClient.post("/logout");
  },

  forgotPassword: {
    enterEmail: (email: string) => {
      return axiosClient.post("/forgot-password", { email });
    },
    verifyCode: (verifyCode: VerifyCodeForgotPassword) => {
      return axiosClient.post("/verify-code", verifyCode);
    },
    resetPassword: (resetPassword: ResetPasswordType) => {
      return axiosClient.post("/reset-password", resetPassword);
    },
  },
};
