import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { sendGuestCustomerDataEvent } from './sendGuestCustomerDataEvent';

jest.mock('@/shared/lib/analytics/esputnik', () => ({ sendEsEvent: jest.fn() }));

describe('sendGuestCustomerDataEvent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('sends CustomerData with email, phone and city (no externalCustomerId) and returns true', () => {
    expect(sendGuestCustomerDataEvent({
      email: 'guest@example.com',
      phone: '380501112233',
      first_name: 'Guest',
      city: 'Kyiv',
    })).toBe(true);

    expect(sendEsEvent).toHaveBeenCalledWith('CustomerData', {
      email: 'guest@example.com',
      first_name: 'Guest',
      phone: '380501112233',
      city: 'Kyiv',
    });
  });

  it('sends when only phone is present (no email, no city)', () => {
    expect(sendGuestCustomerDataEvent({ phone: '380501112233', first_name: 'Guest' })).toBe(true);

    expect(sendEsEvent).toHaveBeenCalledWith('CustomerData', {
      first_name: 'Guest',
      phone: '380501112233',
    });
  });

  it('sends when only email is present (empty phone)', () => {
    expect(sendGuestCustomerDataEvent({
      email: 'guest@example.com',
      phone: '',
      first_name: 'Guest',
    })).toBe(true);

    expect(sendEsEvent).toHaveBeenCalledWith('CustomerData', {
      email: 'guest@example.com',
      first_name: 'Guest',
      phone: '',
    });
  });

  it('returns false and sends nothing without email or phone', () => {
    expect(sendGuestCustomerDataEvent({ phone: '', first_name: 'Guest' })).toBe(false);
    expect(sendEsEvent).not.toHaveBeenCalled();
  });
});
