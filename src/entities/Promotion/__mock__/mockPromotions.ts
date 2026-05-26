import { faker } from '@faker-js/faker';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { PromotionsItem } from '../model/types/Promotions';

export const getMockPromotion = ():PromotionsItem => ({
  picture: faker.image.abstract(676, 357, true),
  title: faker.lorem.words(5),
  start_date: '2026-05-28T22:00:00+03:00',
  end_date: '2026-05-29T10:00:00+03:00',
  has_seconds_until_end: 43200,
  is_started: true,
  show_pdp_timer: false,
});

export const getMockPromotions = mockArrayFactory(getMockPromotion);
