import { Instagram } from '../model/types/types';
import { faker } from '@faker-js/faker';
import { getMockProducts } from '@/entities/Product';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';

export const getMockInstagram = ():Instagram => ({
  id: faker.datatype.uuid(),
  instagram: {
    id: `@${faker.word.noun()}`,
    url: faker.internet.url(),
  },
  created_at: faker.date.recent().toISOString(),
  picture: faker.image.image(),
  products: getMockProducts(),
});

export const getMockInstagrams = mockArrayFactory(getMockInstagram);
