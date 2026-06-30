import { localStorageService } from '@/shared/lib/services/localStorage.service';
import {
  clearPurchaseGuid,
  lastCartGuid,
  nextCartGuid,
  readPurchaseGuid,
  snapshotPurchaseGuid,
} from './esputnikCartGuid';

describe('esputnikCartGuid', () => {
  let counter: number;

  beforeEach(() => {
    localStorageService.clear();
    counter = 0;
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      writable: true,
      value: {
        randomUUID: jest.fn(() => {
          counter += 1;
          return `guid-${counter}`;
        }),
      },
    });
  });

  it('generates a fresh GUID on every nextCartGuid call', () => {
    const first = nextCartGuid();
    const second = nextCartGuid();

    expect(first).toBe('guid-1');
    expect(second).toBe('guid-2');
    expect(first).not.toBe(second);
  });

  it('lastCartGuid returns the most recently generated GUID', () => {
    nextCartGuid();
    const last = nextCartGuid();

    expect(lastCartGuid()).toBe(last);
  });

  it('keeps the purchase snapshot intact across a subsequent nextCartGuid (post-order clear race)', () => {
    nextCartGuid(); // live cart GUID = guid-1
    snapshotPurchaseGuid(); // snapshot = guid-1
    nextCartGuid(); // post-order clear emits a new cart GUID = guid-2

    expect(lastCartGuid()).toBe('guid-2');
    expect(readPurchaseGuid()).toBe('guid-1');
  });

  it('stores the live cart GUID and the purchase snapshot under separate keys', () => {
    nextCartGuid();
    snapshotPurchaseGuid();
    nextCartGuid();

    expect(lastCartGuid()).not.toBe(readPurchaseGuid());
  });

  it('clearPurchaseGuid removes only the purchase snapshot', () => {
    nextCartGuid();
    snapshotPurchaseGuid();
    clearPurchaseGuid();

    expect(readPurchaseGuid()).toBeUndefined();
    expect(lastCartGuid()).toBe('guid-1');
  });

  it('nextCartGuid is a no-op on the server (no window) and never throws', () => {
    const originalWindow = (global as any).window;
    delete (global as any).window;

    expect(() => nextCartGuid()).not.toThrow();
    expect(nextCartGuid()).toBeUndefined();

    (global as any).window = originalWindow;
  });
});
