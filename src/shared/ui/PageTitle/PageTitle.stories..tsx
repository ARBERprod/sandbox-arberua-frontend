import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  title: 'Shared/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const PageTitleDefault: Story = {

};
