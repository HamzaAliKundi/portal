export interface ILoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IForgotPasswordEmail {
  email: string;
}

export interface IResetPasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
