import type { Meta, StoryObj } from '@storybook/react';
import { FaqTabSingle } from './FaqTabSingle';
import { mockedTabsButtons } from '../../constants/mockedTabs';

const meta: Meta<typeof FaqTabSingle> = {
  title: 'views/FaqView/FaqTabSingle',
  component: FaqTabSingle,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqTabSingle>;

export const FaqTabSingleActive: Story = {
  args: {
    currentTab: mockedTabsButtons[0].id,
    id: mockedTabsButtons[0].id,
    title: mockedTabsButtons[0].title,
    icon: mockedTabsButtons[0].picture,
    isActive: true,
    onClick: () => {},
  },
};

export const FaqTabSingleNotActive: Story = {
  args: {
    currentTab: mockedTabsButtons[0].id,
    id: mockedTabsButtons[0].id,
    title: mockedTabsButtons[0].title,
    icon: mockedTabsButtons[0].picture,
    isActive: false,
    onClick: () => {},
  },
};
