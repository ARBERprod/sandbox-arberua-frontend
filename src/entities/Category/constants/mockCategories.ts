import { faker } from '@faker-js/faker';
import CategoryCircleImageTest from '@/shared/assets/images/category-circle-test.jpg';
import { Category } from '../model/types';

const subcategories: Category[] = [];

const arr = Array.from(Array(10));

arr.forEach((_, index) => {
  subcategories.push({
    title: `Subcategory title ${index}`,
    slug: `subcategory-slug-${index}`,
    children: false,
    url: faker.internet.url(),
    is_null: false,
    id: index.toString(),
  });
});

subcategories.push({
  title: 'Subcategory',
  slug: 'subcategory-slug',
  children: false,
  url: faker.internet.url(),
  is_null: false,
  id: '10',
});

const mockedCategory: Category = {
  title: faker.random.word(),
  slug: faker.random.word(),
  picture: CategoryCircleImageTest,
  children: false,
  url: faker.internet.url(),
  is_null: true,
  id: '10',
};

export { mockedCategory, subcategories };
