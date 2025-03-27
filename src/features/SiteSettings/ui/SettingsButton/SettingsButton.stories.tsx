import type { Meta, StoryObj } from '@storybook/react';
import { SettingsButton } from './SettingsButton';

const meta: Meta<typeof SettingsButton> = {
  title: 'features/SiteSettings/SettingsButton',
  component: SettingsButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SettingsButton>;

export const SettingsButtonDefault: Story = {};
