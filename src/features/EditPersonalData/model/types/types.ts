export interface UserPersonalFormData {
  birthday: string;
  sex: 'male' | 'female';
  first_name: string;
  last_name: string;
  middle_name: string;
}

export type UserPasswordFormData = {
  current_password: string;
  password: string;
  password_confirmation: string;
}
