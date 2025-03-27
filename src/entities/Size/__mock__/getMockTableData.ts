import { faker } from '@faker-js/faker';
import { getRandomArrayElement } from '@/shared/lib/utils/rnd';
import { mockArrayFactory } from '@/shared/lib/utils/mockArrayFactory';
import {
  WomanTopClothesData,
  WomanBottomClothesData,
  ManBottomClothesData,
  ManTopClothesData,
  ShoesData,
  ShirtData,
  TShirtData,
  ArberHeightData,
} from '../model/types';

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

const getWomanTopClothesItem = ():WomanTopClothesData => ({
  hip_girth: faker.datatype.number({ min: 92, max: 132 }).toString(),
  bust: faker.datatype.number({ min: 82, max: 124 }).toString(),
  size: `${faker.datatype.number({ min: 42, max: 62 })}(${getRandomArrayElement(sizes)})`,
});

const getWomanBottomClothesItem = ():WomanBottomClothesData => ({
  hip_girth: faker.datatype.number({ min: 92, max: 132 }).toString(),
  size: `${faker.datatype.number({ min: 42, max: 62 })}(${getRandomArrayElement(sizes)})`,
});

const getManBottomClothesItem = ():ManBottomClothesData => ({
  size: `${faker.datatype.number({ min: 42, max: 62 })}/${faker.datatype.number({ min: 42, max: 62 })}`,
  sizes_ua: faker.datatype.number({ min: 46, max: 58 }).toString(),
  waist: faker.datatype.number({ min: 82, max: 124 }).toString(),
  height: `${faker.datatype.number({ min: 42, max: 62 })}(${faker.datatype.number({ min: 42, max: 62 })})`,
});

const getManTopClothesItem = ():ManTopClothesData => ({
  size: `${faker.datatype.number({ min: 42, max: 62 })}(${getRandomArrayElement(sizes)})`,
  sizes_ua: faker.datatype.number({ min: 82, max: 124 }).toString(),
  bust: faker.datatype.number({ min: 82, max: 124 }).toString(),
});

const getShortItem = ():ShirtData => ({
  size: `${faker.datatype.number({ min: 42, max: 62 })}(${getRandomArrayElement(sizes)})`,
  sizes_ua: faker.datatype.number({ min: 82, max: 124 }).toString(),
  neck_girth: faker.datatype.number({ min: 82, max: 124 }).toString(),
  bust: faker.datatype.number({ min: 82, max: 124 }).toString(),
});

const getTShortItem = ():TShirtData => ({
  size: `${faker.datatype.number({ min: 42, max: 62 })}(${getRandomArrayElement(sizes)})`,
  bust: faker.datatype.number({ min: 82, max: 124 }).toString(),
});

const getArberHeightItem = ():ArberHeightData => ({
  size: faker.datatype.number({ min: 3, max: 6 }).toString(),
  height: faker.datatype.number({ min: 170, max: 188 }).toString(),
});

const getShoesItem = ():ShoesData => ({
  size: faker.datatype.number({ min: 35, max: 42 }).toString(),
  shoes_height: faker.datatype.number({ min: 23, max: 28 }).toString(),
});

export const getWomanTopClothesData = mockArrayFactory(getWomanTopClothesItem);
export const getWomanBottomClothesData = mockArrayFactory(getWomanBottomClothesItem);
export const getManBottomClothesData = mockArrayFactory(getManBottomClothesItem);
export const getManTopClothesData = mockArrayFactory(getManTopClothesItem);
export const getShortData = mockArrayFactory(getShortItem);
export const getTShortData = mockArrayFactory(getTShortItem);
export const getArberHeightData = mockArrayFactory(getArberHeightItem);
export const getShoesData = mockArrayFactory(getShoesItem);
