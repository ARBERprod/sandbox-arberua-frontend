import jacketImage from '@/shared/assets/images/look-constructor/clothes-types/jacket.png';
import shoesImage from '@/shared/assets/images/look-constructor/clothes-types/shoes.png';
import trousersImage from '@/shared/assets/images/look-constructor/clothes-types/trousers.png';
import coatImage from '@/shared/assets/images/look-constructor/clothes-types/kurtka.png';
import baseImage from '@/shared/assets/images/look-constructor/clothes-types/base.avif';

import coat1 from '@/shared/assets/images/look-constructor/clothes/coat/1.png';
import coat2 from '@/shared/assets/images/look-constructor/clothes/coat/2.png';
import coat1Preview from '@/shared/assets/images/look-constructor/clothes/coat/1-preview.avif';
import coat2Preview from '@/shared/assets/images/look-constructor/clothes/coat/2-preview.jpg';

import base1 from '@/shared/assets/images/look-constructor/clothes/base/1.png';
import base2 from '@/shared/assets/images/look-constructor/clothes/base/2.png';
import base1Preview from '@/shared/assets/images/look-constructor/clothes/base/1-preview.jpg';
import base2Preview from '@/shared/assets/images/look-constructor/clothes/base/2-preview.jpg';

import shoes1 from '@/shared/assets/images/look-constructor/clothes/shoes/1.avif';
import shoes2 from '@/shared/assets/images/look-constructor/clothes/shoes/2.avif';
import shoes3 from '@/shared/assets/images/look-constructor/clothes/shoes/3.avif';
import shoes1Preview from '@/shared/assets/images/look-constructor/clothes/shoes/1-preview.jpg';
import shoes2Preview from '@/shared/assets/images/look-constructor/clothes/shoes/2-preview.jpg';
import shoes3Preview from '@/shared/assets/images/look-constructor/clothes/shoes/3-preview.jpg';

import trousers1 from '@/shared/assets/images/look-constructor/clothes/trousers/1.avif';
import trousers2 from '@/shared/assets/images/look-constructor/clothes/trousers/2.png';
import trousers1Preview from '@/shared/assets/images/look-constructor/clothes/trousers/1-preview.avif';
import trousers2Preview from '@/shared/assets/images/look-constructor/clothes/trousers/2-preview.jpg';

import jacket1 from '@/shared/assets/images/look-constructor/clothes/jackets/1.avif';
import jacket2 from '@/shared/assets/images/look-constructor/clothes/jackets/2.avif';
import jacket1Preview from '@/shared/assets/images/look-constructor/clothes/jackets/1-preview.avif';
import jacket2Preview from '@/shared/assets/images/look-constructor/clothes/jackets/2-preview.avif';

import { ClothesCategory } from '@/views/LookConstructorView/model/types/LookConstructorSchema';

export const clothesCategories = [
  {
    src: jacketImage,
    title: 'Пиджаки',
    type: ClothesCategory.JACKET,
  },
  {
    src: baseImage,
    title: 'Рубашки',
    type: ClothesCategory.BASE,
  },
  {
    src: trousersImage,
    title: 'Брюки',
    type: ClothesCategory.TROUSERS,
  },
  {
    src: shoesImage,
    title: 'Обувь',
    type: ClothesCategory.SHOES,
  },
  {
    src: coatImage,
    title: 'Куртки',
    type: ClothesCategory.COAT,
  },
];

export const MOCK_COAT = [
  {
    id: '1',
    image: coat1,
    preview: coat1Preview,
  },
  {
    id: '2',
    image: coat2,
    preview: coat2Preview,
  },
];

export const MOCK_BASE = [
  {
    id: '1',
    image: base1,
    preview: base1Preview,
  },
  {
    id: '2',
    image: base2,
    preview: base2Preview,
  },
];
export const MOCK_SHOES = [
  {
    id: '1',
    image: shoes1,
    preview: shoes1Preview,
  },
  {
    id: '2',
    image: shoes2,
    preview: shoes2Preview,
  },
  {
    id: '3',
    image: shoes3,
    preview: shoes3Preview,
  },

];
export const MOCK_JACKETS = [
  {
    id: '1',
    image: jacket1,
    preview: jacket1Preview,
  },
  {
    id: '2',
    image: jacket2,
    preview: jacket2Preview,
  },
];
export const MOCK_TROUSERS = [
  {
    id: '1',
    image: trousers1,
    preview: trousers1Preview,
  },
  {
    id: '2',
    image: trousers2,
    preview: trousers2Preview,
  },
];
