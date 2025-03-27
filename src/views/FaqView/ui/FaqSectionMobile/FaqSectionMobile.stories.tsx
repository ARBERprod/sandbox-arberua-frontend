import type { Meta, StoryObj } from '@storybook/react';
import { FaqSectionMobile } from './FaqSectionMobile';
import { mockedTabsButtons } from '../../constants/mockedTabs';

const meta: Meta<typeof FaqSectionMobile> = {
  title: 'views/FaqView/FaqSectionMobile',
  component: FaqSectionMobile,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqSectionMobile>;

export const FaqSectionMobileDefault: Story = {
  args: {
    tabs: mockedTabsButtons,
  },
};
