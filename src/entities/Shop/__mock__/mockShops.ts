import { faker } from '@faker-js/faker';
import { Shop } from '../model/types';

export const getMockShop = ():Shop => ({
  id: faker.datatype.uuid(),
  title: faker.company.name(),
  pickup_phone: faker.phone.number(),
  pickup_address: faker.address.city(),
  pickup_time: '10:00-20:00',
  pictures: new Array(5).fill(0).map(() => faker.image.business()),
  url: faker.internet.url(),
  latitude: faker.datatype.number(),
  longitude: faker.datatype.number(),
});
export const mockShops = new Array(10).fill(0).map(getMockShop);
