import type { Meta, StoryObj } from '@storybook/react';
import { PageLoader } from './PageLoader';

const meta: Meta<typeof PageLoader> = {
  title: 'shared/loader/PageLoader',
  component: PageLoader,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const PageLoaderDefault: Story = {

};
