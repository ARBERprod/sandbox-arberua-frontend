import { Consultation } from '../model/types';
import { faker } from '@faker-js/faker';
import { getRandomArrayElement } from '@/shared/lib/utils/rnd';
import dayjs from 'dayjs';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { getMockStaff } from '@/entities/Staff';

export const getMockConsultation = ():Consultation => ({
  id: faker.datatype.uuid(),
  consultant: getMockStaff(),
  date: dayjs(faker.date.past()).format('DD.MM.YYYY'),
  review: {
    comment: faker.lorem.lines(5),
    rating: faker.datatype.number({ max: 5, min: 0 }),
  },
});

export const getMockConsultationSecondary = ():Consultation => ({
  id: faker.datatype.uuid(),
  consultant: getMockStaff(),
  date: dayjs(faker.date.past()).format('DD.MM.YYYY HH:MM'),
  status: getRandomArrayElement(['complete', 'scheduled']),
  format: getRandomArrayElement(['online', 'offline']),
  addresses: [
    'ТРЦ Oasis, г.Киев пр-т Оболонский, 47/42',
    'ТРЦ Oasis, г.Одесса пр-т Киевский, 36',
  ],
});

export const getMockConsultations = mockArrayFactory(getMockConsultation);
export const getMockConsultationsSecondary = mockArrayFactory(getMockConsultationSecondary);
