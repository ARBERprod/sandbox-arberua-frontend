import { faker } from '@faker-js/faker';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { TotalLook } from '../model/types';

export const getMockedTotalLook = ():TotalLook => ({
  id: faker.datatype.uuid(),
  url: faker.internet.url(),
  title: 'Some title',
  picture: faker.image.business(),
  products_count: '5',
  product_ids: [faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid()],
});
export const getMockTotalLooks = mockArrayFactory(getMockedTotalLook);
