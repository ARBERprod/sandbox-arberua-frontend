import { authSelectors } from './authSelectors';
import { DeepPartial } from 'redux';
import { StoreSchema } from '@/shared/types/store';
import { AuthModalType } from '../types/AuthSchema';

describe('authSelectors', () => {
  describe('with store', () => {
    const LOGIN_STATE_VALUE = 'login';
    const ACTIVE_MODAL_STATE_VALUE = AuthModalType.REGISTER;
    const store: DeepPartial<StoreSchema> = {
      auth: {
        activeModal: ACTIVE_MODAL_STATE_VALUE,
        login: LOGIN_STATE_VALUE,
      },
    };

    it('Should return active modal from state', () => {
      expect(authSelectors.getActiveModal(store as StoreSchema)).toBe(ACTIVE_MODAL_STATE_VALUE);
    });
    it('Should return user login from state', () => {
      expect(authSelectors.getUserLogin(store as StoreSchema)).toBe(LOGIN_STATE_VALUE);
    });
  });

  describe('without store', () => {
    const store: DeepPartial<StoreSchema> = {};
    it('Should return null as default active modal value', () => {
      expect(authSelectors.getActiveModal(store as StoreSchema)).toBe(null);
    });
    it('Should return empty string as default login value', () => {
      expect(authSelectors.getUserLogin(store as StoreSchema)).toBe('');
    });
  });
});
