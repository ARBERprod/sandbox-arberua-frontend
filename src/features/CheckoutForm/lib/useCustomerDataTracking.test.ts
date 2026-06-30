import { renderHook } from '@testing-library/react';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { getWrapper } from '@/shared/lib/test/getWrapper';
import { User } from '@/entities/User';
import { useCustomerDataTracking } from './useCustomerDataTracking';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));

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

describe('useCustomerDataTracking', () => {
  beforeEach(() => jest.clearAllMocks());

  it('emits CustomerData once for an authenticated shopper', () => {
    const { rerender } = renderHook(() => useCustomerDataTracking(), {
      wrapper: getWrapper({ session: { userData: USER } }),
    });
    rerender();

    expect(sendEsEvent).toHaveBeenCalledTimes(1);
    expect(sendEsEvent).toHaveBeenCalledWith('CustomerData', {
      externalCustomerId: 'u-1',
      email: 'olena@example.com',
      first_name: 'Olena',
      phone: '380671234567',
      sex: 'female',
    });
  });

  it('does not emit for a guest (no authenticated user)', () => {
    renderHook(() => useCustomerDataTracking(), {
      wrapper: getWrapper({ session: { userData: null } }),
    });

    expect(sendEsEvent).not.toHaveBeenCalled();
  });
});
