import type { Meta, StoryObj } from '@storybook/react';
import { SettingsImage } from './SettingsImage';

const meta: Meta<typeof SettingsImage> = {
  title: 'features/SiteSettings/SettingsImage',
  component: SettingsImage,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SettingsImage>;

export const SettingsImageDefault: Story = {
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
