import { faker } from '@faker-js/faker';
import { Post, ArticlePost } from '@/entities/Blog';

export const getMockPost = (): Post => ({
  url: faker.internet.url(),
  title: faker.lorem.word({ length: 6 }),
  reading_time: `${faker.datatype.number({
    min: 5,
    max: 120,
  })} мин`,
  picture: faker.image.people(680, 370, true),
  created_at: '12 февраля 2022',
  description: faker.lorem.lines(3),
});

export const getMockArticle = (): ArticlePost => ({
  url: faker.internet.url(),
  title: faker.lorem.word({ length: 6 }),
  reading_time: `${faker.datatype.number({
    min: 5,
    max: 120,
  })} мин`,
  picture: faker.image.people(680, 370, true),
  created_at: '12 февраля 2022',
  description: faker.lorem.sentence(20),
});

export const getMockPosts = (length = 12): Post[] => new Array(length).fill(0)
  .map(getMockPost);
