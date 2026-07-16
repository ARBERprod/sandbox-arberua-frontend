import { orderMapper } from './orderMapper';
import { OrderDto } from '../api/types';

const getOrderDto = (overrides: Partial<OrderDto> = {}): OrderDto => ({
  id: 'a23f498f-fa4d-44df-9dcf-84768ecdae29',
  order_number: 49308,
  cost: { value: 899, symbol: 'грн' },
  created_at: '2026-07-13 10:16',
  deduct_bonus: 600,
  do_not_call: false,
  note: 'test',
  city: {
    id: '9bb40cb7-2eb8-4014-88aa-5af7d3ec7e87',
    title: 'Одеса - Одеська',
    latitude: '46.48',
    longitude: '30.73',
  },
  address: null,
  customer: {
    id: 'a23f498f-faf7-4b3f-bea9-14086a39b8d4',
    email: 'test@novikov.ua',
    phone: '380936437924',
    first_name: 'firstname',
    last_name: 'lastname',
    middle_name: 'middlename',
  },
  delivery_method: { id: '9b0b023f-cb17-4c68-9033-4e334aaa2a17', title: 'Самовивіз з Нової Пошти' },
  payment_method: { id: '9bc6304f-cc37-49e8-9b6c-aefcbf9bd4dd', title: 'Накладений платіж' },
  status: { id: '9bb38b79-869a-4105-9e9a-0cf4359b117e', title: 'Новий' },
  products: [
    {
      id: 'a2254489-7390-4903-8ae0-8971965cc662',
      parent_id: 'a2254488-6f8d-4757-a9f0-ee5ee575be2d',
      title: 'Футболка чоловіча Arber чорна',
      picture: 'https://api.arber.ua/storage/products/x.jpg',
      url: '/product/futbolka-colovica',
      price: { value: 1499, symbol: 'грн' },
      old_price: { value: 1499, symbol: 'грн' },
      quantity: 2,
      wishlist_count: 0,
      options: [{ property: 'Розмір', value: 'M' }, { property: 'Зріст', value: '4' }],
      bonus_deduction: 600,
      brand: 'Arber',
      category: '',
      variant: 'M',
    },
  ],
  totals: [{ id: '1', title: 'Усього', value: 899 }],
  histories: [],
  count: 2,
  total_price: { value: 899, symbol: 'грн' },
  ...overrides,
});

describe('orderMapper', () => {
  it('maps a complete order', () => {
    const order = orderMapper(getOrderDto());

    expect(order.delivery_method).toBe('Самовивіз з Нової Пошти');
    expect(order.payment_method).toBe('Накладений платіж');
    expect(order.status).toEqual({ color: 'red', title: 'Новий' });
    expect(order.count).toBe(2);
  });

  // The backend calls them `options`; reading `properties` off the DTO silently yielded undefined
  // and Розмір/Зріст never rendered in the order card.
  it('maps backend `options` onto the domain `properties`', () => {
    const order = orderMapper(getOrderDto());

    expect(order.products[0].properties).toEqual([
      { property: 'Розмір', value: 'M' },
      { property: 'Зріст', value: '4' },
    ]);
  });

  // Backend blanks these nullOnDelete FKs on historical orders; before the guard a single
  // such order threw inside transformResponse and wiped the whole /office/orders list.
  it.each([
    ['delivery_method', 'delivery_method'],
    ['payment_method', 'payment_method'],
    ['status', 'status'],
  ] as const)('maps an order with %s = null without throwing', (field) => {
    const order = orderMapper(getOrderDto({ [field]: null }));

    expect(order[field]).toBeNull();
    expect(order.order_number).toBe(49308);
  });

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
