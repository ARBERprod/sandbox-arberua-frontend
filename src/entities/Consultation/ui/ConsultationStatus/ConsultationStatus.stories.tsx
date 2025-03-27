import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationStatus } from './ConsultationStatus';

const meta: Meta<typeof ConsultationStatus> = {
  title: 'entities/Consultation/ConsultationStatus',
  component: ConsultationStatus,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationStatus>;

export const ConsultationStatusDefault: Story = {
  args: {
    status: 'выполнено',
  },
};
