import type { Meta, StoryObj } from '@storybook/react';
import { CollectionsView } from './CollectionsView';

const meta: Meta<typeof CollectionsView> = {
  title: 'views/CollectionsView',
  component: CollectionsView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CollectionsView>;

export const CollectionsViewDefault: Story = {

};
