import type { Meta, StoryObj } from '@storybook/react';
import { EmailForm } from './EmailForm';

const meta: Meta<typeof EmailForm> = {
  title: 'features/editPersonalData/EmailForm',
  component: EmailForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EmailForm>;

export const EmailFormDefault: Story = {

};
