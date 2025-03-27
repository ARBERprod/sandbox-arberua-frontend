export enum EditPersonalDataFormView {
  EMAIL_FORM = 'email-form',
  PASSWORD_FORM = 'password-form',
  PERSONAL_DATA_FORM = 'personal-data-form',
  PHONE_NUMBER_FORM = 'phone-number-form',
}

export interface EditPersonalDataSchema {
  isModalOpen: boolean;
  activeEditPersonalDataFormView: EditPersonalDataFormView | null;
}
