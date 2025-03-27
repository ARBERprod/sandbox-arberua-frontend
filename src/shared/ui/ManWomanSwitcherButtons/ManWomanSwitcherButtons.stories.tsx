import type { Meta, StoryObj } from '@storybook/react';
import { ManWomanSwitcherButtons } from './ManWomanSwitcherButtons';

const meta: Meta<typeof ManWomanSwitcherButtons> = {
  title: 'shared/ManWomanSwitcherButtons',
  component: ManWomanSwitcherButtons,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ManWomanSwitcherButtons>;

export const ManWomanSwitcherButtonsDefault: Story = {
  args: {
    chosenTab: 'tab-2',
    tabs: [
      { title: 'tab 1', slug: 'tab-1' },
      { title: 'tab 2', slug: 'tab-2' },
      { title: 'tab 3', slug: 'tab-3' },
      { title: 'tab 4', slug: 'tab-4' },
    ],
  },
};
