import { faker } from '@faker-js/faker';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { PromotionsItem } from '../model/types/Promotions';

export const getMockPromotion = ():PromotionsItem => ({
  picture: faker.image.abstract(676, 357, true),
  title: faker.lorem.words(5),
  start_date: '2023-07-16T21:00:00.000000Z',
  end_date: '2023-08-16T21:00:00.000000Z',
  has_seconds_until_end: 2552463,
  is_started: true,
});

export const getMockPromotions = mockArrayFactory(getMockPromotion);
