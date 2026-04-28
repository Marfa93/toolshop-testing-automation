type LoginValidity = {
  valid: boolean;
  email_error: boolean;
  password_error: boolean;
  login_error: boolean;
};

export type LoginDataSet = {
  test_name: string;
  email: string;
  password: string;
  validity: LoginValidity;
};
