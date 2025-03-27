import type { Meta, StoryObj } from '@storybook/react';
import { OfficeMenuView } from './OfficeMenuView';

const meta: Meta<typeof OfficeMenuView> = {
  title: 'views/OfficeMenuView',
  component: OfficeMenuView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeMenuView>;

export const OfficeMenuViewDefault: Story = {

};
