import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationOption } from './ConsultationOption';
import { getMockStaff } from '@/entities/Staff';

const meta: Meta<typeof ConsultationOption> = {
  title: 'entities/Consultation/ConsultationOption',
  component: ConsultationOption,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationOption>;

export const ConsultationOptionDefault: Story = {
  args: {
    consultant: getMockStaff(),
  },
};

export const ConsultationOptionActive: Story = {
  args: {
    consultant: getMockStaff(),
    isCurrent: true,
  },
};
