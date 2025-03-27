import type { Meta, StoryObj } from '@storybook/react';
import { ContactsView } from './ContactsView';

const meta: Meta<typeof ContactsView> = {
  title: 'views/ContactsView',
  component: ContactsView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ContactsView>;

export const ContactsViewDefault: Story = {

};
