import type { Meta, StoryObj } from '@storybook/react';
import { getMockArticle } from '@/entities/Blog';
import { ArticlePostView } from './ArticlePostView';

const meta: Meta<typeof ArticlePostView> = {
  title: 'views/ArticlePostView',
  component: ArticlePostView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ArticlePostView>;

export const ArticlePostViewDefault: Story = {
  args: {
    article: getMockArticle(),
    breadcrumbs: [
      { title: 'Головна', url: '/' },
      { title: 'Блог', url: '/blog' },
      { title: 'Конкурси', url: '/blog/konkursi' },
      { title: 'Sit eos qui porro quos et aperiam expedita.', url: '/post/sit-eos-qui-porro-quos-et-aperiam-expedita' },
    ],
  },
};

export const ArticlePostViewWithNextPreviousButtons: Story = {
  args: {
    article: getMockArticle(),
    breadcrumbs: [
      { title: 'Головна', url: '/' },
      { title: 'Блог', url: '/blog' },
      { title: 'Конкурси', url: '/blog/konkursi' },
      { title: 'Sit eos qui porro quos et aperiam expedita.', url: '/post/sit-eos-qui-porro-quos-et-aperiam-expedita' },
    ],
    next: 'next',
    previous: 'previous',
  },
};
