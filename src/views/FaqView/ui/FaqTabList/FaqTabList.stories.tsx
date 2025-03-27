import type { Meta, StoryObj } from '@storybook/react';
import { FaqTabList } from './FaqTabList';
import { mockedTabsButtons } from '../../constants/mockedTabs';

const meta: Meta<typeof FaqTabList> = {
  title: 'views/FaqView/FaqTabList',
  component: FaqTabList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqTabList>;

export const FaqTabListDefault: Story = {
  args: {
    currentTab: null,
    items: mockedTabsButtons,
  },
};

export const FaqTabListWithSelectedTab: Story = {
  args: {
    currentTab: 'FaqTypes.ORDER',
    items: mockedTabsButtons,
  },
};
