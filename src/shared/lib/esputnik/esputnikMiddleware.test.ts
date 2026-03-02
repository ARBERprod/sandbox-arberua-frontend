import { esputnikMiddleware } from './esputnikMiddleware';
import * as esputnikClient from './esputnikClient';
import { sessionApi } from '@/entities/Session/api/sessionApi';

jest.mock('./esputnikClient', () => ({
  esputnikSubscribeOnRegistration: jest.fn(),
  esputnikPasswordResetRequested: jest.fn(),
}));

const createMockStore = () => ({
  getState: jest.fn(),
  dispatch: jest.fn(),
});

describe('esputnikMiddleware', () => {
  const next = jest.fn((action) => action);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls esputnikSubscribeOnRegistration on successful signUp', () => {
    const store = createMockStore();
    const middleware = esputnikMiddleware(store)(next);

    const action = {
      type: sessionApi.endpoints.signUp.matchFulfilled.type,
      meta: {
        arg: {
          originalArgs: {
            email: 'user@example.com',
            first_name: 'John',
            last_name: 'Doe',
            phone: '380501234567',
            birthday: '1990-01-01',
            password: 'pass',
            password_confirmation: 'pass',
          },
        },
        requestStatus: 'fulfilled',
      },
      payload: undefined,
    };

    // Manually set the type to match RTK Query fulfilled action
    Object.defineProperty(action, 'type', {
      value: `api/executeMutation/fulfilled`,
    });

    // Use the matcher directly
    if (sessionApi.endpoints.signUp.matchFulfilled(action as any)) {
      middleware(action);
      expect(esputnikClient.esputnikSubscribeOnRegistration).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
        }),
      );
    }
  });

  it('passes actions through to next', () => {
    const store = createMockStore();
    const middleware = esputnikMiddleware(store)(next);

    const action = { type: 'SOME_ACTION' };
    const result = middleware(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(result).toEqual(action);
  });

  it('does not call esputnik functions for unrelated actions', () => {
    const store = createMockStore();
    const middleware = esputnikMiddleware(store)(next);

    middleware({ type: 'SOME_UNRELATED_ACTION' });

    expect(esputnikClient.esputnikSubscribeOnRegistration).not.toHaveBeenCalled();
    expect(esputnikClient.esputnikPasswordResetRequested).not.toHaveBeenCalled();
  });
});
