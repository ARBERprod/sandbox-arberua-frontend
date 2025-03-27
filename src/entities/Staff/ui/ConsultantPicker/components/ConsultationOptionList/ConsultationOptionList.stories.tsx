import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationOptionList } from './ConsultationOptionList';
import { getMockStaffs } from '@/entities/Staff';

const meta: Meta<typeof ConsultationOptionList> = {
  title: 'entities/Consultation/ConsultationOptionList',
  component: ConsultationOptionList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationOptionList>;

const consultants = getMockStaffs();
const consultants2 = getMockStaffs();

export const ConsultationOptionListNotChecked: Story = {
  args: {
    data: consultants2,
  },
};

export const ConsultationOptionListWithChecked: Story = {
  args: {
    data: consultants,
    activeConsultantId: consultants[1].id,
  },
};
