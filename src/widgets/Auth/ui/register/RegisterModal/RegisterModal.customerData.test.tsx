import { ReactNode } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { routerPaths } from '@/shared/config/router';
import { User } from '@/entities/User';
import { RegisterModal } from './RegisterModal';

jest.mock('@/features/auth/lib/sendCustomerDataEvent', () => ({ sendCustomerDataEvent: jest.fn() }));

const mockDispatch = jest.fn(() => ({ unwrap: () => Promise.resolve() }));
jest.mock('@/shared/lib/hooks/useAppDispatch', () => ({ useAppDispatch: () => mockDispatch }));

// Isolate the modal's onSubmit orchestration from portal + form-validation internals:
// always render children (the barrel re-exports this mocked MainModal), and let the mocked
// form fire onSubmit with a fixed payload.
jest.mock('@/shared/ui/Modal/MainModal', () => ({
  MainModal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../RegisterForm', () => ({
  RegisterForm: ({ onSubmit }: { onSubmit: (data: unknown) => void }) => (
    <button
      type="button"
      data-testid="submit"
      onClick={() => onSubmit({
        last_name: 'P',
        middle_name: '',
        first_name: 'Ivan',
        birthday: '2000-01-01',
        phone: '380501112233',
        email: 'ivan@example.com',
        password: 'secret-pw',
        password_confirmation: 'secret-pw',
      })}
    >
      submit
    </button>
  ),
}));

const USER: User = {
  addresses: [],
  first_name: 'Ivan',
  last_name: 'P',
  middle_name: null,
  email: 'ivan@example.com',
  phone: '380501112233',
  bonus_balance: 0,
  sex: null,
  birthday: null,
  user_id: 'user-9',
};

const sessionUnwrap = jest.fn(() => Promise.resolve({ success: true, data: { user: USER } }));
const sessionTrigger = jest.fn(() => ({ unwrap: sessionUnwrap }));

jest.mock('@/entities/Session', () => ({
  ...jest.requireActual('@/entities/Session'),
  useLazySessionFetchQuery: () => [sessionTrigger],
}));

describe('RegisterModal — CustomerData on registration', () => {
  beforeEach(() => jest.clearAllMocks());

  it('emits CustomerData with the freshly fetched user after a successful registration', async () => {
    const push = jest.fn();
    renderComponent(<RegisterModal />, { router: { push } });

    await userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(sendCustomerDataEvent).toHaveBeenCalledWith(USER);
    });
    expect(push).toHaveBeenCalledWith(routerPaths.office);
  });

  it('does not break the registration flow when the session refresh throws', async () => {
    sessionUnwrap.mockRejectedValueOnce(new Error('session refresh failed'));
    const push = jest.fn();
    renderComponent(<RegisterModal />, { router: { push } });

    await userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(routerPaths.office);
    });
    expect(sendCustomerDataEvent).not.toHaveBeenCalled();
  });
});
