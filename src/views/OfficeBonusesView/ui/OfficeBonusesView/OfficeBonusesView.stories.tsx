import type { Meta, StoryObj } from '@storybook/react';
import { OfficeBonusesView } from './OfficeBonusesView';

const meta: Meta<typeof OfficeBonusesView> = {
  title: 'views/OfficeBonusesView',
  component: OfficeBonusesView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeBonusesView>;

export const OfficeBonusesViewDefault: Story = {

};
