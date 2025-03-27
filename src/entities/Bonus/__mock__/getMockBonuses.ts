import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { Bonus } from '@/entities/Bonus';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { randomNumber } from '@/shared/lib/utils/rnd';

export const getMockBonus = ():Bonus => ({
  id: faker.datatype.uuid(),
  amount: faker.datatype.number({ min: 50, max: 500 }),
  created_at: dayjs(faker.date.past()).format('DD.MM.YYYY'),
  content: faker.lorem.words(randomNumber(2, 10)),
  type: faker.helpers.arrayElement(['earn', 'spend']),
});

export const getMockBonuses = mockArrayFactory(getMockBonus);
