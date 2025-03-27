import { faker } from '@faker-js/faker';
import { Vacancy } from '../model/types';

export const getMockVacancy = (): Vacancy => ({
  id: faker.datatype.uuid(),
  city_id: faker.datatype.uuid(),
  content: faker.lorem.lines(6),
  title: faker.lorem.words(3),
});

export const getMockVacancies = (length = 6) => new Array(length).fill(0)
  .map(getMockVacancy);
