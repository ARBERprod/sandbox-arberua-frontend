import { getPickupCheckoutErrorKey } from '../getPickupCheckoutErrorKey';

describe('getPickupCheckoutErrorKey', () => {
  it.each([
    ['pickup_stock_changed', 'checkout-page:pickup.error.pickup_stock_changed'],
    ['pickup_stock_unavailable', 'checkout-page:pickup.error.pickup_stock_unavailable'],
  ])('maps the known pickup code %s to its namespaced i18n key', (code, expected) => {
    expect(getPickupCheckoutErrorKey(code)).toBe(expected);
  });

  it.each([null, undefined, '', 'PROMOCODE_EXPIRED', 'some_other_code'])(
    'falls back to the unknown key for %s',
    (code) => {
      expect(getPickupCheckoutErrorKey(code)).toBe('checkout-page:pickup.error.unknown');
    },
  );
});
