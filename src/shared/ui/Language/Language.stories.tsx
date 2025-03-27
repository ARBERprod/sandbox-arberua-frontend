import type { Meta, StoryObj } from '@storybook/react';
import { Language } from './Language';

const meta: Meta<typeof Language> = {
  title: 'Shared/Language',
  component: Language,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Language>;

export const LanguageDefault: Story = {
  args: {
  },
};
