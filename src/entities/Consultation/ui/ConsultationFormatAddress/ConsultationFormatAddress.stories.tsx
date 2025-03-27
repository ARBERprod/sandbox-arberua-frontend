import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationFormatAddress } from './ConsultationFormatAddress';
import { getMockConsultationSecondary } from '../../__mock__/getMockConsultations';

const meta: Meta<typeof ConsultationFormatAddress> = {
  title: 'entities/Consultation/ConsultationFormatAddress',
  component: ConsultationFormatAddress,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationFormatAddress>;

export const ConsultationFormatAddressDefault: Story = {
  args: {
    consultation: getMockConsultationSecondary(),
  },
};
