import type { Meta, StoryObj } from '@storybook/react';
import { OfficeBonusesList } from './OfficeBonusesList';

const meta: Meta<typeof OfficeBonusesList> = {
  title: 'views/OfficeBonusesList',
  component: OfficeBonusesList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeBonusesList>;

export const OfficeBonusesListDefault: Story = {

};
