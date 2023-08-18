export type Login = {
  email: string;
  password: string;
};

export type signUp = {
  email: string;
  password: string;
  name: string;
};
export type forgotPasswordEmail = Omit<Login, "password">;
export type forgotPasswordPassword = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
