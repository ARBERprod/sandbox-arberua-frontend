import { cookieModalManager } from '@/features/CookieModal/lib/CookieModalManager';
import { sendEsEvent, stringifyEsParams } from './esputnik';

jest.mock('@/features/CookieModal/lib/CookieModalManager', () => ({
  cookieModalManager: { isCookiesAccepted: jest.fn(() => true) },
}));

const mockedConsent = cookieModalManager.isCookiesAccepted as jest.Mock;

describe('stringifyEsParams', () => {
  it('stringifies price, quantity and isInStock', () => {
    expect(stringifyEsParams({ price: 1990, quantity: 2, isInStock: true })).toEqual({
      price: '1990',
      quantity: '2',
      isInStock: 'true',
    });
  });

  it('stringifies values inside item arrays (cart/order lines)', () => {
    expect(stringifyEsParams({ items: [{ productKey: '7', price: 500, quantity: 3 }] })).toEqual({
      items: [{ productKey: '7', price: '500', quantity: '3' }],
    });
  });

  it('omits a top-level undefined optional field instead of sending "undefined"', () => {
    const result = stringifyEsParams({ productKey: '7', guid: undefined });
    expect(result).toEqual({ productKey: '7' });
    expect(result).not.toHaveProperty('guid');
  });

  it('omits undefined fields inside item arrays', () => {
    expect(stringifyEsParams({ items: [{ productKey: '7', price: 500, quantity: undefined }] })).toEqual({
      items: [{ productKey: '7', price: '500' }],
    });
  });
});

describe('sendEsEvent guard matrix', () => {
  const ORIGINAL_FLAG = process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED;
  let esMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    esMock = jest.fn();
    (window as any).eS = esMock;
    mockedConsent.mockReturnValue(true);
    process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED = 'true';
  });

  afterEach(() => {
    delete (window as any).eS;
    process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED = ORIGINAL_FLAG;
  });

  it('is a no-op on the server (no window) and never throws', () => {
    const originalWindow = (global as any).window;
    delete (global as any).window;
    expect(() => sendEsEvent('MainPage')).not.toThrow();
    expect(esMock).not.toHaveBeenCalled();
    (global as any).window = originalWindow;
  });

  it('no-ops when window.eS is absent', () => {
    delete (window as any).eS;
    sendEsEvent('MainPage');
    expect(esMock).not.toHaveBeenCalled();
  });

  it('no-ops when consent is denied', () => {
    mockedConsent.mockReturnValue(false);
    sendEsEvent('MainPage');
    expect(esMock).not.toHaveBeenCalled();
  });

  it('no-ops when the kill-switch flag is not "true"', () => {
    process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED = 'false';
    sendEsEvent('MainPage');
    expect(esMock).not.toHaveBeenCalled();
  });

  it('calls eS("sendEvent", name) for a no-payload event when all guards pass', () => {
    sendEsEvent('MainPage');
    expect(esMock).toHaveBeenCalledWith('sendEvent', 'MainPage');
  });

  it('stringifies number/boolean params for a payload event', () => {
    sendEsEvent('ProductPage', { productKey: '42', price: 1990, isInStock: true });
    expect(esMock).toHaveBeenCalledWith('sendEvent', 'ProductPage', {
      productKey: '42',
      price: '1990',
      isInStock: 'true',
    });
  });

  it('never throws into the UI when eS itself throws', () => {
    esMock.mockImplementation(() => { throw new Error('boom'); });
    expect(() => sendEsEvent('MainPage')).not.toThrow();
  });
});
