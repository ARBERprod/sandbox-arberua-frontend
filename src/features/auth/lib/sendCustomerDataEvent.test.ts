import { User } from '@/entities/User';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { sendCustomerDataEvent } from './sendCustomerDataEvent';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));

const baseUser: User = {
  addresses: [],
  first_name: 'Ivan',
  last_name: 'Petrenko',
  middle_name: null,
  email: 'ivan@example.com',
  phone: '380501112233',
  bonus_balance: 0,
  sex: 'male',
  birthday: null,
  user_id: 'user-7',
};

describe('sendCustomerDataEvent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('maps the user to the CustomerData payload and returns true', () => {
    expect(sendCustomerDataEvent(baseUser)).toBe(true);

    expect(sendEsEvent).toHaveBeenCalledWith('CustomerData', {
      externalCustomerId: 'user-7',
      email: 'ivan@example.com',
      first_name: 'Ivan',
      phone: '380501112233',
      sex: 'male',
    });
  });

  it('omits sex when it is null', () => {
    sendCustomerDataEvent({ ...baseUser, sex: null });

    expect(sendEsEvent).toHaveBeenCalledWith('CustomerData', {
      externalCustomerId: 'user-7',
      email: 'ivan@example.com',
      first_name: 'Ivan',
      phone: '380501112233',
    });
  });

  it('returns false and sends nothing without a user_id (partial hydration snapshot)', () => {
    expect(sendCustomerDataEvent({ ...baseUser, user_id: '' })).toBe(false);
    expect(sendEsEvent).not.toHaveBeenCalled();
  });

  it('returns false and sends nothing without an email', () => {
    expect(sendCustomerDataEvent({ ...baseUser, email: '' })).toBe(false);
    expect(sendEsEvent).not.toHaveBeenCalled();
  });
});
