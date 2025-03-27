export type PersonalDataBody = {
  first_name: string;
  last_name: string;
  middle_name: string;
  birthday: string;
  sex: 'male' | 'female';
}

export type EditPasswordBody = {
  current_password: string;
  password: string;
  password_confirmation: string;
}
