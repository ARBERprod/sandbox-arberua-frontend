import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { makeStore } from '@/shared/config/store/makeStore';
import type { Shop } from '@/entities/Shop';
import { getPickupPoints } from '../checkoutApi';
import type { PickupPointsData } from '../types';

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

const canonicalAvailable: PickupPointsData = {
  points: [shop],
  unavailable_items: [],
  no_common_store: false,
  stock_check_unavailable: false,
};

// Mirror of the contract invariant: when 1C is down, only stock_check_unavailable is set.
const canonicalStockDown: PickupPointsData = {
  points: [],
  unavailable_items: [],
  no_common_store: false,
  stock_check_unavailable: true,
};

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('checkoutApi.getPickupPoints', () => {
  it('hits /checkout/pickup-points with city_id (not is_city_id) and unwraps data', async () => {
    let params: URLSearchParams | undefined;
    let path: string | undefined;
    server.use(rest.get('*/checkout/pickup-points', (req, res, ctx) => {
      params = req.url.searchParams;
      path = req.url.pathname;
      return res(ctx.json({ success: true, data: canonicalAvailable }));
    }));

    const store = makeStore();
    const result = await store.dispatch(getPickupPoints.initiate({ city_id: 'city-1' })).unwrap();

    expect(path?.endsWith('/checkout/pickup-points')).toBe(true);
    expect(params?.get('city_id')).toBe('city-1');
    expect(params?.get('is_city_id')).toBeNull();
    expect(result).toEqual(canonicalAvailable);
  });

  it('passes the fail-closed stock_check_unavailable shape through unchanged', async () => {
    server.use(rest.get('*/checkout/pickup-points', (_req, res, ctx) => res(
      ctx.json({ success: true, data: canonicalStockDown }),
    )));

    const store = makeStore();
    const result = await store.dispatch(getPickupPoints.initiate({ city_id: 'city-2' })).unwrap();

    expect(result.stock_check_unavailable).toBe(true);
    expect(result.points).toEqual([]);
    expect(result.unavailable_items).toEqual([]);
    expect(result.no_common_store).toBe(false);
  });
});
