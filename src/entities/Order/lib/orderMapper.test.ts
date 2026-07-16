import { orderMapper } from './orderMapper';
import { OrderDto } from '../api/types';

// Shaped after a real GET /v2/profile/orders payload — keep it in sync with OrderResource,
// including which fields the API omits entirely.
const getOrderDto = (overrides: Partial<OrderDto> = {}): OrderDto => ({
  id: '00000000-0000-4000-8000-000000000001',
  order_number: 49308,
  cost: { value: 899, symbol: 'грн' },
  created_at: '2026-07-13 10:16',
  deduct_bonus: 600,
  note: 'test',
  city: {
    id: '00000000-0000-4000-8000-000000000002',
    title: 'Одеса - Одеська',
    latitude: '46.48',
    longitude: '30.73',
  },
  address: null,
  customer: {
    id: '00000000-0000-4000-8000-000000000003',
    email: 'order-test@example.com',
    phone: '380000000000',
    first_name: 'firstname',
    last_name: 'lastname',
    middle_name: 'middlename',
  },
  delivery_method: { id: '00000000-0000-4000-8000-000000000004', title: 'Самовивіз з Нової Пошти' },
  payment_method: { id: '00000000-0000-4000-8000-000000000005', title: 'Накладений платіж' },
  status: { id: '00000000-0000-4000-8000-000000000006', title: 'Новий' },
  products: [
    {
      id: '00000000-0000-4000-8000-000000000007',
      parent_id: '00000000-0000-4000-8000-000000000008',
      title: 'Футболка чоловіча Arber чорна',
      picture: 'https://api.arber.ua/storage/products/x.jpg',
      url: '/product/futbolka-colovica',
      price: { value: 1499, symbol: 'грн' },
      old_price: { value: 1499, symbol: 'грн' },
      quantity: 2,
      options: [{ property: 'Розмір', value: 'M' }, { property: 'Зріст', value: '4' }],
      bonus_deduction: 600,
      brand: 'Arber',
      category: '',
      variant: 'M',
    },
  ],
  totals: [{ title: 'Усього', value: 899 }],
  histories: [],
  ...overrides,
});

describe('orderMapper', () => {
  it('maps a complete order', () => {
    const order = orderMapper(getOrderDto());

    expect(order.delivery_method).toBe('Самовивіз з Нової Пошти');
    expect(order.payment_method).toBe('Накладений платіж');
    expect(order.status).toEqual({ title: 'Новий' });
    expect(order.count).toBe(2);
  });

  it('maps backend `options` onto the domain `properties`', () => {
    const order = orderMapper(getOrderDto());

    expect(order.products[0].properties).toEqual([
      { property: 'Розмір', value: 'M' },
      { property: 'Зріст', value: '4' },
    ]);
  });

  // One such order used to throw inside transformResponse and wipe the whole list — see OrderDto.
  it.each(['delivery_method', 'payment_method', 'status', 'city'] as const)(
    'maps an order with %s = null without throwing',
    (field) => {
      const order = orderMapper(getOrderDto({ [field]: null }));

      expect(order[field]).toBeNull();
      expect(order.order_number).toBe(49308);
    },
  );

  it('maps an order with every nullable relation missing', () => {
    const order = orderMapper(getOrderDto({
      delivery_method: null,
      payment_method: null,
      status: null,
    }));

    expect(order).toMatchObject({
      delivery_method: null,
      payment_method: null,
      status: null,
      count: 2,
    });
  });
});
