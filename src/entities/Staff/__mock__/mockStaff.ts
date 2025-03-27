import { DetailedStaff, Staff } from '../model/types';
import { faker } from '@faker-js/faker';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { getMockShop } from '@/entities/Shop';

export const getMockStaff = (): Staff => ({
  id: faker.datatype.uuid(),
  user_name: faker.internet.userName(),
  url: faker.internet.url(),
  picture: faker.image.image(),
  store: getMockShop(),
});

export const getMockStaffs = mockArrayFactory(getMockStaff);

export const getMockDetailedStaff = ():DetailedStaff => ({
  id: faker.datatype.uuid(),
  user_name: faker.internet.userName(),
  url: faker.internet.url(),
  picture: faker.image.image(),
  store: getMockShop(),
  comments: {
    comments_count: faker.datatype.number({ min: 1, max: 10 }),
    comments_avg_rating: String(faker.datatype.number({ min: 1, max: 10 })),
  },
});
