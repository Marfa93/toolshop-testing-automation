export type ValidityResult = Readonly<{
  valid: boolean;
  first_name_error: boolean;
  last_name_error: boolean;
  dob_error: boolean;
  country_error: boolean;
  postal_code_error: boolean;
  house_number_error: boolean;
  street_error: boolean;
  city_error: boolean;
  state_error: boolean;
  phone_error: boolean;
  email_error: boolean;
  password_error: boolean;
  registration_error: boolean;
}>;

export type RegistrationData = Readonly<{
  first_name: string;
  last_name: string;
  date_of_birth: string; // Format: YYYY-MM-DD
  country: string;
  postal_code: string;
  house_number: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
}>;

export type RegistrationDataSet = Readonly<
  RegistrationData & {
    test_name: string;
    validity: ValidityResult;
  }
>;
