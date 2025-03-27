import type { Meta, StoryObj } from '@storybook/react';
import { OfficeConsultationsView } from './OfficeConsultationsView';

const meta: Meta<typeof OfficeConsultationsView> = {
  title: 'views/OfficeConsultationsView',
  component: OfficeConsultationsView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeConsultationsView>;

export const OfficeConsultationsViewDefault: Story = {

};
