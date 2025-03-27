import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { getMockOrderProduct } from '@/entities/Order';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { ProductReview } from '../model/types';

export const getMockProductReview = ():ProductReview => ({
  id: faker.datatype.uuid(),
  comment: {
    content: faker.lorem.lines(3),
    rating: faker.datatype.number({ min: 0, max: 5 }),
  },
  date: dayjs(faker.date.past()).format('DD.MM.YYYY'),
  product: getMockOrderProduct(),
});

export const getMockProductReviews = mockArrayFactory(getMockProductReview);
