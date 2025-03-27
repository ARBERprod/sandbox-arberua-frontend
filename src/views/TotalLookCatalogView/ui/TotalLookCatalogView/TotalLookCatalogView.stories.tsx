import type { Meta, StoryObj } from '@storybook/react';
import { TotalLookCatalogView } from './TotalLookCatalogView';

const meta: Meta<typeof TotalLookCatalogView> = {
  title: 'Views/TotalLookCatalogView',
  component: TotalLookCatalogView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TotalLookCatalogView>;

export const TotalLookCatalogViewDefault: Story = {

};
