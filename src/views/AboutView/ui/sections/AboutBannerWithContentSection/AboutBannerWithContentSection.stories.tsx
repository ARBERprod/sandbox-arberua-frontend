import type { Meta, StoryObj } from '@storybook/react';
import AboutBg1 from '@/shared/assets/images/about-page/about-bg-1.jpg';
import { AboutBannerWithContentSection } from './AboutBannerWithContentSection';

const meta: Meta<typeof AboutBannerWithContentSection> = {
  title: 'views/About/sections/AboutBannerWithContentSection',
  component: AboutBannerWithContentSection,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AboutBannerWithContentSection>;

export const AboutBannerWithContentSectionPrimary: Story = {
  args: {
    title: 'Якісний елегантний одяг = ARBER',
    subtitle: 'Глобальна fashion-компанія. Лідер у сегменті класичного одягу для середнього класу',
    variant: 'primary',
    Image: AboutBg1,
  },
};

export const AboutBannerWithContentSectionSecondary: Story = {
  args: {
    title: 'Якісний елегантний одяг = ARBER',
    subtitle: 'Глобальна fashion-компанія. Лідер у сегменті класичного одягу для середнього класу',
    variant: 'secondary',
    Image: AboutBg1,
  },
};
