import type { Meta, StoryObj } from '@storybook/react';
import { Contacts } from './Contacts';

const meta: Meta<typeof Contacts> = {
  title: 'shared/Contacts',
  component: Contacts,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Contacts>;

export const ContactsDefault: Story = {
  args: {
    variant: 'normal',
  },
};

export const ContactsVariantContactPage: Story = {
  args: {
    variant: 'contactsPage',
  },
};

export const ContactsFaqPage: Story = {
  args: {
    variant: 'faqPage',
  },
};
