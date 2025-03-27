import type { Meta, StoryObj } from '@storybook/react';
import { FaqAccordionItem } from './FaqAccordionItem';

const meta: Meta<typeof FaqAccordionItem> = {
  title: 'views/FaqView/FaqAccordionItem',
  component: FaqAccordionItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqAccordionItem>;

export const FaqAccordionItemDefault: Story = {
  args: {
    item: {
      id: '1',
      title: 'Как часто обновляется ассортимент магазина?',
      description: 'Ассортимент Arber обновляется ежедневно. Подпишись на рассылку, и ты будешь в числе первых узнавать о новых поступлениях, скидках и лимитированных коллекциях.',
    },
  },
};
