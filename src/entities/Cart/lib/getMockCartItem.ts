import { faker } from '@faker-js/faker';
import { CartItemOption, ICartItem } from '../model/types/types';
import { getMockPrice } from '@/shared/lib/mock/price';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';

export const getMockCartItemProperty = (): CartItemOption => ({
  title: faker.helpers.arrayElement(['Размер', 'Цвет']),
  value: faker.helpers.arrayElement(['XL', 'L', 'Red', 'Green']),
});

export const getMockCartItemProperties = mockArrayFactory(getMockCartItemProperty);

export const getMockCartItem = (): ICartItem => (
  {
    quantity: 2,
    price: getMockPrice(),
    old_price: getMockPrice(),
    owner_id: faker.datatype.uuid(),
    title: faker.lorem.words(3),
    url: faker.internet.url(),
    picture: faker.image.image(),
    id: faker.datatype.uuid(),
    cost: getMockPrice(),
    options: getMockCartItemProperties(2),
    category: faker.commerce.department(),
    brand: faker.company.name(),
    variant: faker.commerce.productMaterial(),
    parent_id: faker.datatype.uuid(),
  }
);

export const getMockCartItems = (count: number):ICartItem[] => new Array(count).fill(0).map(getMockCartItem);
