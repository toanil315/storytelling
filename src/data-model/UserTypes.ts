interface UserBase {
  email: string;
  password: string;
}

export interface UserLogin extends UserBase {}

export interface UserRegister extends UserBase {
  fullName: string;
}

export interface UserType extends UserBase {
  role: string;
}
