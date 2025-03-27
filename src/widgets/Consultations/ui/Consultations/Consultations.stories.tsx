import type { Meta, StoryObj } from '@storybook/react';
import { Consultations } from './Consultations';

const meta: Meta<typeof Consultations> = {
  title: 'features/Consultations',
  component: Consultations,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Consultations>;

export const ConsultationsDefault: Story = {};
