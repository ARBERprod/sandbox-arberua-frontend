import type { Meta, StoryObj } from '@storybook/react';
import { noop } from '@/shared/lib/utils/noop';
import { ConsultantPicker } from './ConsultantPicker';
import { getMockStaffs } from '../../__mock__/mockStaff';

const meta: Meta<typeof ConsultantPicker> = {
  title: 'entities/Consultation/ConsultantPicker',
  component: ConsultantPicker,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultantPicker>;

export const ConsultationSelectDefault: Story = {
  args: {
    consultants: getMockStaffs(),
  },
};

export const ConsultationSelectChosenValue: Story = {
  render: () => {
    const consultants = getMockStaffs();
    return (
      <ConsultantPicker
        name="consultant"
        value={consultants[0].id}
        consultants={consultants}
        onBack={noop}
        onChange={noop}
        onCloseModal={noop}
      />
    );
  },
};
