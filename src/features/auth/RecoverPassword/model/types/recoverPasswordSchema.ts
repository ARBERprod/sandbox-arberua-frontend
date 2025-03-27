export type RecoverPasswordModalType = 'success' | 'email' | 'password'

export interface RecoverPasswordSchema {
  activeModal: RecoverPasswordModalType | null;
  email: string;
}
