import { act } from '@testing-library/react';
import { renderComponent } from '@/shared/lib/test/renderComponent';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { PasswordForm } from './PasswordForm';

jest.mock('@/features/auth/lib/sendCustomerDataEvent', () => ({ sendCustomerDataEvent: jest.fn() }));

const mockUpdate = jest.fn(() => ({ unwrap: () => Promise.resolve() }));
jest.mock('../../api/editPersonalDataApi', () => ({
  useUpdatePasswordMutation: () => [mockUpdate, { isLoading: false }],
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

describe('PasswordForm — CustomerData', () => {
  beforeEach(() => jest.clearAllMocks());

  it('never sends CustomerData on a password change (backend upsert is idempotent)', async () => {
    renderComponent(<PasswordForm />);

    await act(async () => {
      await mockOnSubmitRef.current?.({
        current_password: 'old-pw',
        password: 'new-pw',
        password_confirmation: 'new-pw',
      });
    });

    expect(sendCustomerDataEvent).not.toHaveBeenCalled();
  });
});
