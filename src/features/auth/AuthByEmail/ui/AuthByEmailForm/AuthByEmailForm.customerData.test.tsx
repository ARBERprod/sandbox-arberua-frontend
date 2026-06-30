import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { User } from '@/entities/User';
import { AuthByEmailForm } from './AuthByEmailForm';

jest.mock('@/features/auth/lib/sendCustomerDataEvent', () => ({ sendCustomerDataEvent: jest.fn() }));

const mockDispatch = jest.fn(() => ({ unwrap: () => Promise.resolve() }));
jest.mock('@/shared/lib/hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch,
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

describe('AuthByEmailForm — CustomerData on login', () => {
  beforeEach(() => jest.clearAllMocks());

  it('emits CustomerData with the freshly fetched user after a successful sign-in', async () => {
    renderComponent(<AuthByEmailForm onSubmit={jest.fn()} />);

    await userEvent.type(screen.getByPlaceholderText(/e-mail/i), 'ivan@example.com');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), 'secret-pw');
    await userEvent.click(screen.getByRole('button', { name: /Увійти/i }));

    await waitFor(() => {
      expect(sendCustomerDataEvent).toHaveBeenCalledWith(USER);
    });
  });
});
