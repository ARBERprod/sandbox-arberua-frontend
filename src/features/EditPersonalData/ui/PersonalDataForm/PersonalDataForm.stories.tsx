import type { Meta, StoryObj } from '@storybook/react';
import { PersonalDataForm } from './PersonalDataForm';

const meta: Meta<typeof PersonalDataForm> = {
  title: 'features/editPersonalData/PersonalDataForm',
  component: PersonalDataForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PersonalDataForm>;

export const PersonalDataFormDefault: Story = {

};
