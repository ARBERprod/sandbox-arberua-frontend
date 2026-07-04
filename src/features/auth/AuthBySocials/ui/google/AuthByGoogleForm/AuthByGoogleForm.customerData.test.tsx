import { act } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { routerPaths } from '@/shared/config/router';
import { User } from '@/entities/User';
import { AuthByGoogleForm } from './AuthByGoogleForm';

jest.mock('@/features/auth/lib/sendCustomerDataEvent', () => ({ sendCustomerDataEvent: jest.fn() }));

const mockDispatch = jest.fn(() => ({ unwrap: () => Promise.resolve() }));
jest.mock('@/shared/lib/hooks/useAppDispatch', () => ({ useAppDispatch: () => mockDispatch }));

const mockCloseGoogleModal = jest.fn();
jest.mock('../../../model/slices/authBySocialsSlice', () => ({
  ...jest.requireActual('../../../model/slices/authBySocialsSlice'),
  useAuthBySocialsActions: () => ({ closeGoogleModal: mockCloseGoogleModal }),
}));

// Capture the onSubmit handed to useForm so we can drive registration without masked-field UI.
const mockOnSubmitRef: { current: ((data: unknown) => void) | null } = { current: null };
jest.mock('@/shared/lib/hooks/useForm', () => {
  const actual = jest.requireActual('@/shared/lib/hooks/useForm');
  return {
    ...actual,
    useForm: (opts: { onSubmit: (data: unknown) => void }) => {
      mockOnSubmitRef.current = opts.onSubmit;
      return {
        field: () => ({
          name: '', value: '', onChange: jest.fn(), onBlur: jest.fn(),
        }),
        submitHandler: (e?: { preventDefault?: () => void }) => e?.preventDefault?.(),
      };
    },
  };
});

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

const FORM_DATA = {
  phone: '380501112233',
  password: 'secret-pw',
  birthday: '2000-01-01',
  password_confirmation: 'secret-pw',
};

describe('AuthByGoogleForm — CustomerData on Google registration', () => {
  beforeEach(() => jest.clearAllMocks());

  it('emits CustomerData with the freshly fetched user after a successful registration', async () => {
    const push = jest.fn();
    renderComponent(<AuthByGoogleForm />, { router: { push } });

    await act(async () => {
      await mockOnSubmitRef.current?.(FORM_DATA);
    });

    expect(sendCustomerDataEvent).toHaveBeenCalledWith(USER);
    expect(mockCloseGoogleModal).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith(routerPaths.office);
  });

  it('does not break the registration flow when the session refresh throws', async () => {
    sessionUnwrap.mockRejectedValueOnce(new Error('session refresh failed'));
    const push = jest.fn();
    renderComponent(<AuthByGoogleForm />, { router: { push } });

    await act(async () => {
      await mockOnSubmitRef.current?.(FORM_DATA);
    });

    expect(sendCustomerDataEvent).not.toHaveBeenCalled();
    expect(mockCloseGoogleModal).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith(routerPaths.office);
  });
});
