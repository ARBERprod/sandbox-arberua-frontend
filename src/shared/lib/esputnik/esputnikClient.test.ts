import {
  esputnikSubscribeOnRegistration,
  esputnikOrderConfirmed,
  esputnikPasswordResetRequested,
  esputnikEmailConfirmed,
  esputnikCheckoutAbandoned,
  esputnikBonusAccrued,
} from './esputnikClient';
import { ESPUTNIK_API_ROUTES } from './constants';

const mockFetch = jest.fn(() => Promise.resolve({ ok: true }));
global.fetch = mockFetch as any;

beforeEach(() => {
  mockFetch.mockClear();
});

describe('esputnikClient', () => {
  describe('esputnikSubscribeOnRegistration', () => {
    it('sends subscribe request to the correct route', () => {
      esputnikSubscribeOnRegistration({
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '380501234567',
        lang: 'uk',
        birthday: '1990-01-01',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        ESPUTNIK_API_ROUTES.SUBSCRIBE,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.email).toBe('user@example.com');
      expect(body.firstName).toBe('John');
      expect(body.lastName).toBe('Doe');
      expect(body.phone).toBe('380501234567');
      expect(body.lang).toBe('uk');
      expect(body.source).toBe('site');
      expect(body.formType).toBe('registration');
      expect(body.groups).toContain('registered');
    });

    it('defaults lang to uk when not provided', () => {
      esputnikSubscribeOnRegistration({
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.lang).toBe('uk');
    });
  });

  describe('esputnikPasswordResetRequested', () => {
    it('sends password reset event', () => {
      esputnikPasswordResetRequested({ email: 'user@example.com' });

      expect(mockFetch).toHaveBeenCalledWith(
        ESPUTNIK_API_ROUTES.EVENT,
        expect.objectContaining({ method: 'POST' }),
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.eventKey).toBe('password_reset_requested');
      expect(body.email).toBe('user@example.com');
    });
  });

  describe('esputnikEmailConfirmed', () => {
    it('sends both contact update and event', () => {
      esputnikEmailConfirmed({
        email: 'user@example.com',
        externalId: '123',
      });

      expect(mockFetch).toHaveBeenCalledTimes(2);

      // Contact update call
      expect(mockFetch.mock.calls[0][0]).toBe(ESPUTNIK_API_ROUTES.CONTACTS);
      const contactBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(contactBody.email).toBe('user@example.com');
      expect(contactBody.groupNames).toContain('email_confirmed');

      // Event call
      expect(mockFetch.mock.calls[1][0]).toBe(ESPUTNIK_API_ROUTES.EVENT);
      const eventBody = JSON.parse(mockFetch.mock.calls[1][1].body);
      expect(eventBody.eventKey).toBe('email_confirmed');
    });
  });

  describe('esputnikOrderConfirmed', () => {
    it('sends contact update and order event', () => {
      esputnikOrderConfirmed({
        email: 'user@example.com',
        phone: '380501234567',
        firstName: 'John',
        lastName: 'Doe',
        externalId: '123',
        orderId: 'order-1',
        orderNumber: 1001,
        orderDate: '2026-02-26',
        totalAmount: 5000,
        currency: 'UAH',
        paymentMethod: 'Card',
        deliveryMethod: 'Nova Poshta',
        items: [
          {
            sku: 'SKU-001',
            name: 'T-shirt',
            qty: 2,
            price: 1500,
            product_url: '/product/tshirt',
          },
        ],
      });

      expect(mockFetch).toHaveBeenCalledTimes(2);

      // Contact update
      const contactBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(contactBody.groupNames).toContain('customers');

      // Order event
      const eventBody = JSON.parse(mockFetch.mock.calls[1][1].body);
      expect(eventBody.eventKey).toBe('order_confirmed');
      expect(eventBody.eventData.order_id).toBe('order-1');
      expect(eventBody.eventData.total_amount).toBe('5000');

      const items = JSON.parse(eventBody.eventData.items);
      expect(items).toHaveLength(1);
      expect(items[0].sku).toBe('SKU-001');
    });
  });

  describe('esputnikCheckoutAbandoned', () => {
    it('sends checkout abandoned event with cart data', () => {
      Object.defineProperty(window, 'location', {
        value: { origin: 'https://arber.ua' },
        writable: true,
      });

      esputnikCheckoutAbandoned({
        email: 'user@example.com',
        externalId: '123',
        cartTotal: 3000,
        currency: 'UAH',
        items: [
          { sku: 'SKU-001', name: 'Shirt', qty: 1, price: 3000 },
        ],
      });

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.eventKey).toBe('checkout_abandoned');
      expect(body.eventData.cart_total).toBe('3000');
      expect(body.eventData.currency).toBe('UAH');
    });
  });

  describe('esputnikBonusAccrued', () => {
    it('sends bonus accrued event', () => {
      esputnikBonusAccrued({
        email: 'user@example.com',
        externalId: '123',
        bonusAmount: 100,
        bonusBalance: 500,
        reason: 'purchase',
      });

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.eventKey).toBe('bonus_accrued');
      expect(body.eventData.bonus_amount).toBe('100');
      expect(body.eventData.bonus_balance).toBe('500');
      expect(body.eventData.reason).toBe('purchase');
    });
  });

  describe('error handling', () => {
    it('does not throw when fetch fails', () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      expect(() => {
        esputnikSubscribeOnRegistration({
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
        });
      }).not.toThrow();
    });
  });
});
