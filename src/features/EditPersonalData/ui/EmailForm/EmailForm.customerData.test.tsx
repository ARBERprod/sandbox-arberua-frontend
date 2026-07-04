import { act } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { User } from '@/entities/User';
import { EmailForm } from './EmailForm';

jest.mock('@/features/auth/lib/sendCustomerDataEvent', () => ({ sendCustomerDataEvent: jest.fn() }));

const mockUpdate = jest.fn(() => ({ unwrap: () => Promise.resolve() }));
jest.mock('../../api/editPersonalDataApi', () => ({
  useUpdateEmailMutation: () => [mockUpdate, { isLoading: false }],
}));

const USER: User = {
  addresses: [],
  first_name: 'Ivan',
  last_name: 'Name',
  middle_name: null,
  email: 'old@example.com',
  phone: '380501112233',
  bonus_balance: 0,
  sex: 'male',
  birthday: null,
  user_id: 'u1',
};

jest.mock('@/entities/Session', () => ({
  ...jest.requireActual('@/entities/Session'),
  useAuth: () => ({ userData: USER }),
}));

const mockOnSubmitRef: { current: ((data: unknown) => Promise<void> | void) | null } = { current: null };
jest.mock('@/shared/lib/hooks/useForm', () => {
  const actual = jest.requireActual('@/shared/lib/hooks/useForm');
  return {
    ...actual,
    useForm: (opts: { onSubmit: (data: unknown) => Promise<void> | void }) => {
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

describe('EmailForm — CustomerData on save', () => {
  beforeEach(() => jest.clearAllMocks());

  it('sends CustomerData with the new email merged over the current identifiers', async () => {
    renderComponent(<EmailForm />);

    await act(async () => {
      await mockOnSubmitRef.current?.({ email: 'new@example.com' });
    });

    expect(sendCustomerDataEvent).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'u1',
      email: 'new@example.com',
      first_name: 'Ivan',
      phone: '380501112233',
    }));
  });
});
