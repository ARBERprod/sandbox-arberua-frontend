import { renderHook } from '@testing-library/react';
import { useAuth } from '@/entities/Session';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { User } from '@/entities/User';
import { useCustomerDataTracking } from './useCustomerDataTracking';

jest.mock('@/entities/Session', () => ({ useAuth: jest.fn() }));
jest.mock('@/features/auth/lib/sendCustomerDataEvent', () => ({ sendCustomerDataEvent: jest.fn() }));

const mockedUseAuth = useAuth as jest.Mock;
const mockedSend = sendCustomerDataEvent as jest.Mock;

const USER: User = {
  addresses: [],
  first_name: 'Olena',
  last_name: 'K',
  middle_name: null,
  email: 'olena@example.com',
  phone: '380671234567',
  bonus_balance: 0,
  sex: 'female',
  birthday: null,
  user_id: 'u-1',
};

// Hydration snapshot with a name but no contact identifiers — the shape that leaked before.
const PARTIAL = { first_name: 'Olena', sex: 'female' } as unknown as User;

describe('useCustomerDataTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuth.mockReturnValue({ userData: null });
  });

  it('does not track a guest (no authenticated user)', () => {
    renderHook(() => useCustomerDataTracking());
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it('tracks once for an authenticated shopper and latches on subsequent renders', () => {
    mockedUseAuth.mockReturnValue({ userData: USER });
    mockedSend.mockReturnValue(true);

    const { rerender } = renderHook(() => useCustomerDataTracking());
    rerender();

    expect(mockedSend).toHaveBeenCalledTimes(1);
    expect(mockedSend).toHaveBeenCalledWith(USER);
  });

  it('does not latch on an incomplete send; retries and sends once userData completes', () => {
    mockedUseAuth.mockReturnValue({ userData: PARTIAL });
    mockedSend.mockReturnValue(false); // identifiers missing → nothing sent

    const { rerender } = renderHook(() => useCustomerDataTracking());
    expect(mockedSend).toHaveBeenCalledTimes(1);
    expect(mockedSend).toHaveBeenCalledWith(PARTIAL);

    mockedUseAuth.mockReturnValue({ userData: USER });
    mockedSend.mockReturnValue(true); // enriched → sent
    rerender();
    expect(mockedSend).toHaveBeenCalledTimes(2);
    expect(mockedSend).toHaveBeenLastCalledWith(USER);

    rerender();
    expect(mockedSend).toHaveBeenCalledTimes(2); // now latched
  });
});
