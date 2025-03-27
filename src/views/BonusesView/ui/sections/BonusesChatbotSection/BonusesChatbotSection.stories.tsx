import type { Meta, StoryObj } from '@storybook/react';
import { BonusesChatbotSection } from './BonusesChatbotSection';

const meta: Meta<typeof BonusesChatbotSection> = {
  title: 'views/BonusesChatbotSection',
  component: BonusesChatbotSection,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BonusesChatbotSection>;

export const BonusesChatbotSectionDefault: Story = {

};
