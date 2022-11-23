interface UserBase {
  email: string;
  password: string;
}

export interface UserLogin extends UserBase {}

export interface UserRegister extends UserBase {
  fullName: string;
}

export interface UserType extends UserBase {
  fullName: string;
  userId: string;
  role: string;
  avatarUrl: string | null;
}

export interface VerifyCodeForgotPassword {
  email: string;
  verifyCode: number;
}

export interface ResetPasswordType {
  email: string;
  verifyCode: number;
  password: string;
}
