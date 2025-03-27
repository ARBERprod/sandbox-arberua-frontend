import { authActions, authReducer } from './authSlice';
import { AuthModalType, AuthSchema } from '../types/AuthSchema';

describe('authSlice', () => {
  it('Should open login modal', () => {
    const state: AuthSchema = {
      activeModal: null,
      login: '',
    };

    const result = {
      activeModal: AuthModalType.LOGIN_USERNAME,
    };

    expect(authReducer(state, authActions.openLoginModal()))
      .toEqual(expect.objectContaining(result));
  });
  it('Should open register modal', () => {
    const state: AuthSchema = {
      activeModal: null,
      login: '',
    };

    const result = {
      activeModal: AuthModalType.REGISTER,
    };

    expect(authReducer(state, authActions.openRegisterModal()))
      .toEqual(expect.objectContaining(result));
  });

  it('Should reset login state and close modal', () => {
    const state: AuthSchema = {
      activeModal: AuthModalType.LOGIN_USERNAME,
      login: 'login',
    };
    const result = {
      activeModal: null,
      login: '',
    };

    expect(authReducer(state, authActions.closeModal()))
      .toEqual(result);
  });
  it('Should set login', () => {
    const LOGIN_INPUT = 'LOGIN_INPUT';
    const state: AuthSchema = {
      activeModal: AuthModalType.LOGIN_USERNAME,
      login: '',
    };
    const result = {
      login: LOGIN_INPUT,
    };

    expect(authReducer(state, authActions.setLogin(LOGIN_INPUT)))
      .toEqual(expect.objectContaining(result));
  });

  it('Should set another modal', () => {
    const state: AuthSchema = {
      activeModal: AuthModalType.REGISTER,
      login: '',
    };

    const result = {
      activeModal: AuthModalType.LOGIN_PASSWORD,
    };

    expect(authReducer(state, authActions.setActiveModal(AuthModalType.LOGIN_PASSWORD)))
      .toEqual(expect.objectContaining(result));
  });
});
