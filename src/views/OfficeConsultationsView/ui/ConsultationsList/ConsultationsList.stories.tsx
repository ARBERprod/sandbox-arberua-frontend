import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationsList } from './ConsultationsList';

const meta: Meta<typeof ConsultationsList> = {
  title: 'views/OfficeConsultationsView/ConsultationsList',
  component: ConsultationsList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationsList>;

export const ConsultationsListDefault: Story = {

};
