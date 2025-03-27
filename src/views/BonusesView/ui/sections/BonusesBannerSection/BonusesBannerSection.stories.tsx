import type { Meta, StoryObj } from '@storybook/react';
import { BonusesBannerSection } from './BonusesBannerSection';

const meta: Meta<typeof BonusesBannerSection> = {
  title: 'views/BonusesBannerSection',
  component: BonusesBannerSection,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BonusesBannerSection>;

export const BonusesBannerSectionDefault: Story = {

};
