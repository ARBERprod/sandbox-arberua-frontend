import { faker } from '@faker-js/faker';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import { Address } from '../model/types';
import { City } from '@/entities/Location';

export const getMockCity = ():City => ({
  id: faker.datatype.uuid(),
  title: faker.address.city(),
  latitude: faker.address.latitude(),
  longitude: faker.address.longitude(),
});

export const getMockAddress = ():Address => ({
  id: faker.datatype.uuid(),
  index: '12345',
  flat: faker.datatype.number({ min: 1, max: 100 }).toString(),
  house: faker.datatype.number({ min: 1, max: 100 }).toString(),
  street: faker.address.street(),
  city: getMockCity(),
  country: {
    id: faker.datatype.uuid(),
    title: faker.address.country(),
  },
});

export const getMockAddresses = mockArrayFactory(getMockAddress);
