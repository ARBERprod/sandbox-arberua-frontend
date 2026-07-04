import { act } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { User } from '@/entities/User';
import { PhoneNumberForm } from './PhoneNumberForm';

jest.mock('@/features/auth/lib/sendCustomerDataEvent', () => ({ sendCustomerDataEvent: jest.fn() }));

const mockUpdate = jest.fn(() => ({ unwrap: () => Promise.resolve() }));
jest.mock('../../api/editPersonalDataApi', () => ({
  useUpdatePhoneMutation: () => [mockUpdate, { isLoading: false }],
}));

const USER: User = {
  addresses: [],
  first_name: 'Ivan',
  last_name: 'Name',
  middle_name: null,
  email: 'ivan@example.com',
  phone: '380000000000',
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

describe('PhoneNumberForm — CustomerData on save', () => {
  beforeEach(() => jest.clearAllMocks());

  it('sends CustomerData with the new phone merged over the current identifiers', async () => {
    renderComponent(<PhoneNumberForm />);

    await act(async () => {
      await mockOnSubmitRef.current?.({ phone: '380501112233' });
    });

    expect(sendCustomerDataEvent).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'u1',
      email: 'ivan@example.com',
      first_name: 'Ivan',
      phone: '380501112233',
    }));
  });
});
