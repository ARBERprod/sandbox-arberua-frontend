export enum AuthModalType {
  LOGIN_USERNAME = 'login-username',
  LOGIN_PASSWORD = 'login-password',
  REGISTER = 'register',
  RECOVER_EMAIL = 'recover-email',
  RECOVER_PASSWORD = 'recover-password',
}

export interface AuthSchema {
  activeModal: AuthModalType | null;
  login: string;
}
