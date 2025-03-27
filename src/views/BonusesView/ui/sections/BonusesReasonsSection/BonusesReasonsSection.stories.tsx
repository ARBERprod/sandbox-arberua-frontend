import type { Meta, StoryObj } from '@storybook/react';
import { BonusesReasonsSection } from './BonusesReasonsSection';

const meta: Meta<typeof BonusesReasonsSection> = {
  title: 'views/BonusesReasonsSection',
  component: BonusesReasonsSection,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BonusesReasonsSection>;

export const BonusesReasonsSectionDefault: Story = {

};
