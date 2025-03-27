import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { SettingsModal } from './SettingsModal';

const meta: Meta<typeof SettingsModal> = {
  title: 'features/SiteSettings/SettingsModal',
  component: SettingsModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SettingsModal>;

export const SettingsModalDefault: Story = {
  decorators: [
    StoreDecorator({
      siteSettings: {
        isSettingsModalOpen: true,
      },
    }),
  ],
};
