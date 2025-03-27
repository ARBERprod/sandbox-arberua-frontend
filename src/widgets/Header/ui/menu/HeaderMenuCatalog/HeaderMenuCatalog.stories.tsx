import type { Meta, StoryObj } from '@storybook/react';
import { HeaderMenuCatalog } from './HeaderMenuCatalog';

const meta: Meta<typeof HeaderMenuCatalog> = {
  title: 'widgets/Header/HeaderMenuCatalog',
  component: HeaderMenuCatalog,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof HeaderMenuCatalog>;

export const HeaderMenuCatalogExpanded: Story = {
  args: {
  },
};
