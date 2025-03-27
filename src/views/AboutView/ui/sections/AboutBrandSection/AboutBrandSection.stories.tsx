import type { Meta, StoryObj } from '@storybook/react';
import { AboutBrandSection } from './AboutBrandSection';
import { aboutBrandSections } from '../../../constants';

const meta: Meta<typeof AboutBrandSection> = {
  title: 'views/About/sections/AboutBrandSection',
  component: AboutBrandSection,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AboutBrandSection>;

export const AboutBrandSectionImageRightAligned: Story = {
  args: {
    variant: 'left',
    title: aboutBrandSections[0].title,
    list: aboutBrandSections[0].list,
    image: aboutBrandSections[0].image,
  },
};

export const AboutBrandSectionImageLeftAligned: Story = {
  args: {
    variant: 'right',
    title: aboutBrandSections[0].title,
    list: aboutBrandSections[0].list,
    image: aboutBrandSections[0].image,
  },
};
