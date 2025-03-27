import CategoryCircleImageTest from '@/shared/assets/images/category-circle-test.jpg';
import { Category } from '@/entities/Category';

const categories: Category[] = [];

const arr = Array.from(Array(10));

arr.forEach((_, index) => {
  categories.push({
    id: index.toString(),
    title: `Category title ${index}`,
    picture: CategoryCircleImageTest,
    slug: 'category-slug',
    children: false,
    url: '/url',
    is_null: true,
  });
});

export { categories };
