import type { Meta, StoryObj } from '@storybook/react';
import { OfficeNavigation } from './OfficeNavigation';

const meta: Meta<typeof OfficeNavigation> = {
  title: 'widgets/OfficeNavigation',
  component: OfficeNavigation,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeNavigation>;

export const OfficeNavigationDefault: Story = {

};
