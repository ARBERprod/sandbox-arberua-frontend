import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { FooterBanner } from './FooterBanner';

const meta: Meta<typeof FooterBanner> = {
  title: 'widgets/Footer/FooterBanner',
  component: FooterBanner,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterBanner>;

export const FooterBannerDefault: Story = {
  args: {
    title: faker.lorem.words(4),
    description: faker.lorem.words(17),
  },
};
