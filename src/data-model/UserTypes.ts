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

export interface UserDetail extends UserType {
  address: string | null;
  isActivated: boolean;
  occupation: string | null;
  phone: string | null;
  payment: string | null;
  dateOfBirth: string;
  identityImageUrl: string;
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

export interface UpdateProfileToBecomeInstructor {
  address: string;
  occupation: string;
  identityImageUrl: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
}

export interface ChangePasswordType {
  oldPassword: string;
  newPassword: string;
}
