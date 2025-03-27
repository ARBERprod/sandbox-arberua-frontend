import type { Meta, StoryObj } from '@storybook/react';
import { RatedComment } from './RatedComment';

const meta: Meta<typeof RatedComment> = {
  title: 'entities/Comment/RatedComment',
  component: RatedComment,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RatedComment>;

export const RatedCommentDefault: Story = {
  args: {
    rate: 4,
    content: 'Получила сегодня жакет в размере S, сел идеально. Какой он крутой, я в него просто влюбилась. Ткань легенькая и хорошо тянется, смотрится очень оригинально. С брюками вообще огонь. Спасибо большое',
  },
};
