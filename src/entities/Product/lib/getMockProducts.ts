import { faker } from '@faker-js/faker';
import {
  DetailedProduct, Product, ProductSku, SmallProduct,
} from '../model/types';
import { getMockPrice } from '@/shared/lib/mock/price';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';

export const getMockSku = (): ProductSku => ({
  id: faker.datatype.uuid(),
  title: faker.helpers.arrayElement(['S', 'XS', 'M', 'L', 'XL']),
  is_sale: faker.datatype.boolean(),
  old_price: getMockPrice(),
  price: getMockPrice(),
  bonus_can_be_written_off: faker.datatype.number(),
  identifier_sync: faker.datatype.uuid(),
});

export const getMockSkus = mockArrayFactory(getMockSku);

export const getMockProduct = (options?: { sale?: true, id?: string }): Product => ({
  id: options?.id || faker.datatype.uuid(),
  url: faker.internet.url(),
  discount: options?.sale ? `${faker.datatype.number(100)}%` : undefined,
  price: getMockPrice(),
  title: faker.commerce.productName(),
  old_price: options?.sale ? getMockPrice() : false,
  wishlists_count: 9,
  pictures: [
    faker.image.abstract(450, 575, true),
    faker.image.abstract(450, 575, true),
    faker.image.abstract(450, 575, true),
  ],
  skus: faker.helpers.arrayElement([null, getMockSkus()]),
  category: faker.commerce.department(),
  brand: faker.company.name(),
  parent_id: faker.datatype.uuid(),
});

export const getMockSmallProduct = (options?: { sale?: true, id?: string }): SmallProduct => ({
  id: options?.id || faker.datatype.uuid(),
  url: faker.internet.url(),
  price: getMockPrice(),
  title: faker.commerce.productName(),
  old_price: options?.sale ? getMockPrice() : false,
  picture: faker.image.abstract(450, 575, true),
  wishlists_count: 9,
  skus: getMockSkus(),
  category: faker.commerce.department(),
  brand: faker.company.name(),
});

export const getMockSmallProducts = mockArrayFactory(getMockSmallProduct);

export const getMockProducts = (options?: { sale?: true, count?: number }): Product[] => new Array(
  options?.count || 10,
).fill(0)
  .map(() => getMockProduct(options));

export const getMockDetailedProduct = (options?: {
  sale?: true;
  id?: string;
}): DetailedProduct => ({
  id: options?.id || faker.datatype.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: getMockPrice(),
  old_price: getMockPrice(),
  pictures: [faker.image.abstract(450, 575, false)],
  pictures2: [{
    cropped: faker.image.abstract(450, 575, false),
    original: faker.image.abstract(800, 1000, false),
  }],
  wishlists_count: faker.datatype.number({
    min: 0,
    max: 10,
  }),
  is_sale: true,
  materials: [],
  comments: {
    rating: 3,
    count: 10,
  },
  url: faker.internet.url(),
  article: faker.datatype.string(2),
  bonus_can_be_written_off: faker.helpers.arrayElement([
    null,
    faker.datatype.number({
      min: 10,
      max: 500,
    }),
  ]),
  bonus_accrual: faker.helpers.arrayElement([
    null,
    faker.datatype.number({
      min: 10,
      max: 500,
    }),
  ]),
  skus: getMockSkus(),
  category: faker.commerce.department(),
  brand: faker.company.name(),
  parent_id: faker.datatype.uuid(),
  sizing_type: faker.helpers.arrayElement(['man', 'woman', 'shoes'] as const),
});
