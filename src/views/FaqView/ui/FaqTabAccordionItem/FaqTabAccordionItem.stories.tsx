import type { Meta, StoryObj } from '@storybook/react';
import { FaqTabAccordionItem } from './FaqTabAccordionItem';
import { mockedTabsButtons } from '../../constants/mockedTabs';

const meta: Meta<typeof FaqTabAccordionItem> = {
  title: 'views/FaqView/FaqTabAccordionItem',
  component: FaqTabAccordionItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqTabAccordionItem>;

export const FaqTabAccordionItemDefault: Story = {
  args: {
    tab: mockedTabsButtons[0],
  },
};
