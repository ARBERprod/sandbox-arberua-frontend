import type { Meta, StoryObj } from '@storybook/react';
import { CatalogView } from './CatalogView';

const meta: Meta<typeof CatalogView> = {
  title: 'Views/CatalogView',
  component: CatalogView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CatalogView>;

export const CatalogViewDefault: Story = {

};
