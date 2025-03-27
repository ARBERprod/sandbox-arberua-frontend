import type { Meta, StoryObj } from '@storybook/react';
import { ShoesTables } from './ShoesTables';

const meta: Meta<typeof ShoesTables> = {
  title: 'views/sizesView/ShoesTables',
  component: ShoesTables,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ShoesTables>;

export const ShoesTablesDefault: Story = {

};
