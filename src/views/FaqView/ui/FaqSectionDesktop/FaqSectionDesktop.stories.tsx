import type { Meta, StoryObj } from '@storybook/react';
import { FaqSectionDesktop } from './FaqSectionDesktop';
import { mockedTabsButtons } from '../../constants/mockedTabs';

const meta: Meta<typeof FaqSectionDesktop> = {
  title: 'views/FaqView/FaqSectionDesktop',
  component: FaqSectionDesktop,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqSectionDesktop>;

export const FaqSectionDesktopDefault: Story = {
  args: {
    currentTab: 'FaqTypes.ABOUT',
    currentQuestions: [],
    tabs: mockedTabsButtons,
    onClick: () => {},
  },
};
