import type { Meta, StoryObj } from '@storybook/react';
import { BonusesFeaturesSection } from './BonusesFeaturesSection';

const meta: Meta<typeof BonusesFeaturesSection> = {
  title: 'views/BonusesFeaturesSection',
  component: BonusesFeaturesSection,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BonusesFeaturesSection>;

export const BonusesFeaturesSectionDefault: Story = {

};
