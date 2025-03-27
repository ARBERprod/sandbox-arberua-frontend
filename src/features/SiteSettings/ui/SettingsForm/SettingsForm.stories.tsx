import type { Meta, StoryObj } from '@storybook/react';
import { SettingsForm } from './SettingsForm';

const meta: Meta<typeof SettingsForm> = {
  title: 'features/SiteSettings/SettingsForm',
  component: SettingsForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SettingsForm>;

export const SettingsFormDefault: Story = {};
