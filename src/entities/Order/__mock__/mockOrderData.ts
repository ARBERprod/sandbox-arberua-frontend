import { faker } from '@faker-js/faker';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { Order, OrderProduct } from '../model/types';
import { getMockPrice } from '@/shared/lib/mock/price';
import { OrderTotalItem } from '../api/types';
import { City } from '@/entities/Location';

export const getMockOrderProduct = (): OrderProduct => ({
  id: faker.datatype.uuid(),
  url: faker.internet.url(),
  title: faker.word.conjunction(),
  picture: faker.image.image(),
  price: getMockPrice(),
  quantity: faker.datatype.number({ min: 1, max: 10 }),
  properties: [
    {
      property: 'Цвет',
      value: 'черный',
    },
    {
      property: 'Размер',
      value: '54',
    },
  ],
});

export const getMockOrderProducts = (length = 5) => new Array(length).fill(0).map(getMockOrderProduct);

export const getMockOrderTotalItem = (): OrderTotalItem => ({
  title: faker.commerce.productName(),
  value: faker.datatype.number(),
  id: faker.datatype.string(),
});

export const getMockCity = (): City => ({
  id: faker.datatype.string(),
  title: faker.datatype.string(),
  latitude: faker.datatype.string(),
  longitude: faker.datatype.string(),
});

export const getMockOrder = (): Order => ({
  id: faker.datatype.uuid(),
  date: new Date(faker.date.past()).toLocaleDateString(),
  count: faker.datatype.number({ min: 1, max: 10 }),
  status: {
    color: faker.color.rgb(),
    title: faker.word.adverb(),
  },
  total_price: getMockPrice(),
  cost: getMockPrice(),
  delivery_method: faker.lorem.words(3),
  note: faker.helpers.maybe(() => faker.lorem.lines(2), { probability: 0.5 }) || null,
  products: getMockOrderProducts(),
  payment_method: faker.lorem.words(3),
  histories: [],
  order_number: faker.datatype.number({ min: 1, max: 1000 }),
  deduct_bonus: faker.datatype.number(),
  city: getMockCity(),
  address: {
    id: faker.datatype.string(),
    street: faker.datatype.string(),
    house: faker.datatype.string(),
    flat: faker.datatype.string(),
  } || null,
  totals: [
    getMockOrderTotalItem(),
  ],
  customer: {
    email: faker.datatype.string(),
    first_name: faker.datatype.string(),
    id: faker.datatype.string(),
    last_name: faker.datatype.string(),
    middle_name: faker.datatype.string(),
    phone: faker.datatype.string(),
  },
});

export const getMockOrders = mockArrayFactory(getMockOrder);
