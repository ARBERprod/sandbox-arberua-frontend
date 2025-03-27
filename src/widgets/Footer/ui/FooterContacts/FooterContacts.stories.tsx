import type { Meta, StoryObj } from '@storybook/react';
import { FooterContacts } from './FooterContacts';

const meta: Meta<typeof FooterContacts> = {
  title: 'widgets/Footer/FooterContacts',
  component: FooterContacts,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FooterContacts>;

export const FooterContactsDefault: Story = {
  args: {

  },
};
