import { cookieModalManager } from '@/features/CookieModal/lib/CookieModalManager';
import { sendEsEvent, buildEsWirePayload } from './esputnik';

jest.mock('@/features/CookieModal/lib/CookieModalManager', () => ({
  cookieModalManager: { isCookiesAccepted: jest.fn(() => true) },
}));

const mockedConsent = cookieModalManager.isCookiesAccepted as jest.Mock;

describe('buildEsWirePayload — documented eSputnik wire schema', () => {
  it('nests ProductPage under its event key; price string, isInStock as 1', () => {
    expect(buildEsWirePayload('ProductPage', { productKey: '42', price: 1990, isInStock: true })).toEqual({
      ProductPage: { productKey: '42', price: '1990', isInStock: 1 },
    });
  });

  it('maps isInStock false to 0', () => {
    expect(buildEsWirePayload('ProductPage', { productKey: '42', price: 0, isInStock: false })).toEqual({
      ProductPage: { productKey: '42', price: '0', isInStock: 0 },
    });
  });

  it('nests CategoryPage under its event key', () => {
    expect(buildEsWirePayload('CategoryPage', { categoryKey: 'men' })).toEqual({
      CategoryPage: { categoryKey: 'men' },
    });
  });

  it('nests AddToWishlist under its event key; price string', () => {
    expect(buildEsWirePayload('AddToWishlist', { productKey: '7', price: 500 })).toEqual({
      AddToWishlist: { productKey: '7', price: '500' },
    });
  });

  it('nests StatusCart lines with currency + GUID sibling', () => {
    expect(
      buildEsWirePayload('StatusCart', {
        items: [{ productKey: '7', price: 500, quantity: 2 }],
        guid: 'g-1',
      }),
    ).toEqual({
      StatusCart: [{
        productKey: '7', price: '500', quantity: '2', currency: 'UAH',
      }],
      GUID: 'g-1',
    });
  });

  it('omits GUID from StatusCart when the guid is absent', () => {
    const result = buildEsWirePayload('StatusCart', { items: [{ productKey: '7', price: 500, quantity: 1 }] });
    expect(result).not.toHaveProperty('GUID');
    expect(result).toEqual({
      StatusCart: [{
        productKey: '7', price: '500', quantity: '1', currency: 'UAH',
      }],
    });
  });

  it('nests PurchasedItems with string OrderNumber, currency and GUID sibling', () => {
    expect(
      buildEsWirePayload('PurchasedItems', {
        items: [{ productKey: '7', price: 500, quantity: 3 }],
        OrderNumber: 1001,
        guid: 'g-2',
      }),
    ).toEqual({
      OrderNumber: '1001',
      PurchasedItems: [{
        productKey: '7', price: '500', quantity: '3', currency: 'UAH',
      }],
      GUID: 'g-2',
    });
  });

  it('maps CustomerData fields to eSputnik names; sex → user_tags_gender', () => {
    expect(
      buildEsWirePayload('CustomerData', {
        externalCustomerId: 'u1',
        email: 'a@b.c',
        first_name: 'Jo',
        phone: '380',
        sex: 'male',
      }),
    ).toEqual({
      CustomerData: {
        externalCustomerId: 'u1',
        user_email: 'a@b.c',
        user_name: 'Jo',
        user_phone: '380',
        user_tags_gender: 'male',
      },
    });
  });

  it('omits user_tags_gender when sex is unknown', () => {
    const result = buildEsWirePayload('CustomerData', {
      externalCustomerId: 'u1',
      email: 'a@b.c',
      first_name: 'Jo',
      phone: '380',
    }) as { CustomerData: Record<string, unknown> };
    expect(result.CustomerData).not.toHaveProperty('user_tags_gender');
  });

  it('omits empty externalCustomerId/user_email and maps city → user_city (guest snapshot)', () => {
    expect(
      buildEsWirePayload('CustomerData', {
        first_name: 'Jo',
        phone: '380',
        city: 'Kyiv',
      }),
    ).toEqual({
      CustomerData: {
        user_name: 'Jo',
        user_phone: '380',
        user_city: 'Kyiv',
      },
    });
  });

  it('drops externalCustomerId and user_email when passed as empty strings', () => {
    const result = buildEsWirePayload('CustomerData', {
      externalCustomerId: '',
      email: '',
      first_name: 'Jo',
      phone: '380',
    }) as { CustomerData: Record<string, unknown> };
    expect(result.CustomerData).not.toHaveProperty('externalCustomerId');
    expect(result.CustomerData).not.toHaveProperty('user_email');
    expect(result.CustomerData).not.toHaveProperty('user_city');
  });

  it('returns undefined for parameterless events (MainPage/NotFound)', () => {
    expect(buildEsWirePayload('MainPage', undefined)).toBeUndefined();
    expect(buildEsWirePayload('NotFound', undefined)).toBeUndefined();
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

  it('installs the eS command queue and buffers the event when window.eS is absent', () => {
    // eS.js loads after mount effects; the stub buffers events (init first) until it drains.
    // Entries are nested `[callArgs]` — eS.js detects init via entry[0][0] and replays entry[0].
    delete (window as any).eS;
    sendEsEvent('MainPage');
    const es = (window as any).eS;
    expect(typeof es).toBe('function');
    expect(es.q).toEqual([[['init']], [['sendEvent', 'MainPage']]]);
    expect(es.q.find((e: unknown[][]) => e[0][0] === 'init')).toBeDefined();
  });

  it('does not re-queue init when window.eS already exists (reuses the real eS.js)', () => {
    sendEsEvent('MainPage');
    expect(esMock).toHaveBeenCalledTimes(1);
    expect(esMock).toHaveBeenCalledWith('sendEvent', 'MainPage');
    expect(esMock).not.toHaveBeenCalledWith('init');
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

  it('sends the documented nested wire payload for a payload event', () => {
    sendEsEvent('ProductPage', { productKey: '42', price: 1990, isInStock: true });
    expect(esMock).toHaveBeenCalledWith('sendEvent', 'ProductPage', {
      ProductPage: { productKey: '42', price: '1990', isInStock: 1 },
    });
  });

  it('never throws into the UI when eS itself throws', () => {
    esMock.mockImplementation(() => { throw new Error('boom'); });
    expect(() => sendEsEvent('MainPage')).not.toThrow();
  });
});
