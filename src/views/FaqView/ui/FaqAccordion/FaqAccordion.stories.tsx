import type { Meta, StoryObj } from '@storybook/react';
import { FaqAccordion } from './FaqAccordion';

const meta: Meta<typeof FaqAccordion> = {
  title: 'views/FaqView/FaqAccordion',
  component: FaqAccordion,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FaqAccordion>;

export const FaqAccordionDefault: Story = {
  args: {
    items: [],
  },
};
