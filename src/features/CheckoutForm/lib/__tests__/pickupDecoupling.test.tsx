import { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import i18n from '@/shared/lib/test/i18nForTest';
import { StoreProvider } from '@/providers/StoreProvider/StoreProvider';
import type { Shop } from '@/entities/Shop';
import { DeliveryMethod } from '../../api/types';
import { usePickupPoints } from '../usePickupPoints';
import { useWarehouses } from '../useWarehouses';

const shop: Shop = {
  id: 'store-1',
  title: 'ARBER Хрещатик',
  pickup_phone: '+380000000000',
  pickup_address: 'вул. Хрещатик, 1',
  pickup_time: 'Пн-Нд 10:00-21:00',
  latitude: 50.45,
  longitude: 30.52,
  url: '/stores/store-1',
};

const pickupBody = {
  success: true,
  data: {
    points: [shop],
    unavailable_items: [],
    no_common_store: false,
    stock_check_unavailable: false,
  },
};

const storeMethod: DeliveryMethod = {
  id: 'dm-store', title: 'Самовивіз з магазину', description: null, code: 'store', type: 'storage',
};
const newPostMethod: DeliveryMethod = {
  id: 'dm-np', title: 'Нова Пошта', description: null, code: 'new_post', type: 'storage',
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    <StoreProvider>{children}</StoreProvider>
  </I18nextProvider>
);

let pickupHits = 0;
let warehousesHits = 0;
const server = setupServer(
  rest.get('*/checkout/pickup-points', (_req, res, ctx) => {
    pickupHits += 1;
    return res(ctx.json(pickupBody));
  }),
  rest.get('*/warehouses', (_req, res, ctx) => {
    warehousesHits += 1;
    return res(ctx.json({ success: true, data: [] }));
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => { pickupHits = 0; warehousesHits = 0; });
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('store decoupling from useWarehouses (Step 3.2)', () => {
  it('usePickupPoints loads points from /checkout/pickup-points when enabled and a city is set', async () => {
    const { result } = renderHook(
      () => usePickupPoints({ cityId: 'kyiv', enabled: true }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.points).toHaveLength(1));
    expect(result.current.points[0].id).toBe('store-1');
    expect(pickupHits).toBe(1);
  });

  it('usePickupPoints skips the request when disabled (store not relevant)', async () => {
    const { result } = renderHook(
      () => usePickupPoints({ cityId: 'kyiv', enabled: false }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.points).toEqual([]);
    expect(pickupHits).toBe(0);
  });

  it('useWarehouses does NOT hit /warehouses for the store method (routed via pickup-points)', async () => {
    renderHook(
      () => useWarehouses({ deliveryMethod: storeMethod, cityId: 'kyiv' }),
      { wrapper },
    );

    // Give RTK Query a chance to dispatch — it must not, because store is skipped.
    await new Promise((r) => { setTimeout(r, 30); });
    expect(warehousesHits).toBe(0);
  });

  it('useWarehouses still hits /warehouses for new_post', async () => {
    renderHook(
      () => useWarehouses({ deliveryMethod: newPostMethod, cityId: 'kyiv' }),
      { wrapper },
    );

    await waitFor(() => expect(warehousesHits).toBe(1));
  });
});

// The store method is routed through getPickupPoints, so the warehouses
// onEmptyResults auto-switch (which flips delivery_method_id to address) can
// never fire for store — an empty pickup list is a diagnostics case, not a
// technical-empty that should bounce the shopper off store (Step 3.3 / 4.2).
describe('no auto-switch away from store on empty pickup (Step 3.3 / 4.2)', () => {
  it('does NOT invoke onEmptyResults for the store method even though warehouses is empty', async () => {
    const onEmptyResults = jest.fn();
    renderHook(
      () => useWarehouses({ deliveryMethod: storeMethod, cityId: 'kyiv', onEmptyResults }),
      { wrapper },
    );

    // Give RTK Query a window to (not) dispatch and settle.
    await new Promise((r) => { setTimeout(r, 30); });
    expect(warehousesHits).toBe(0);
    expect(onEmptyResults).not.toHaveBeenCalled();
  });

  it('still invokes onEmptyResults for new_post technical-empty (auto-switch preserved)', async () => {
    const onEmptyResults = jest.fn();
    renderHook(
      () => useWarehouses({ deliveryMethod: newPostMethod, cityId: 'kyiv', onEmptyResults }),
      { wrapper },
    );

    await waitFor(() => expect(onEmptyResults).toHaveBeenCalledTimes(1));
  });
});
