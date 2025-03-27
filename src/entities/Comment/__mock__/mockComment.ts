import { faker } from '@faker-js/faker';
import { Comment } from '../model/types/Comment';

export const getMockComment = (): Comment => ({
  id: faker.datatype.uuid(),
  created_at: faker.date.weekday(),
  rating: faker.datatype.number({
    min: 0,
    max: 5,
  }),
  content: faker.lorem.lines(3),
  author: {
    id: faker.datatype.uuid(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
  },
});

export const getMockComments = (length = 6): Comment[] => new Array(length).fill(0)
  .map(getMockComment);
