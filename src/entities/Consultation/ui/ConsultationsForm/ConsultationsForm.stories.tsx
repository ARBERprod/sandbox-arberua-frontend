import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationsForm } from './ConsultationsForm';
import { ConsultantPicker, getMockStaffs } from '@/entities/Staff';

const meta: Meta<typeof ConsultationsForm> = {
  title: 'entities/Consultations/ConsultationsForm',
  component: ConsultationsForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationsForm>;

export const ConsultationsFormDefault: Story = {
  args: {
    formId: '1',
    consultantPicker: (field) => (
      <ConsultantPicker
        label="Выберите консультанта"
        onFocus={() => {}}
        consultants={getMockStaffs()}
        onBack={() => {}}
        onCloseModal={() => {}}
        {...field}
      />
    ),
  },
};
