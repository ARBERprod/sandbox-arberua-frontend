import type { Meta, StoryObj } from '@storybook/react';
import { Contacts } from '@/shared/ui/Contacts';
import { FeedbackForm } from '@/features/ContactUsForm';
import { ContactUsFormWrapper } from './ContactUsFormWrapper';

const meta: Meta<typeof ContactUsFormWrapper> = {
  title: 'shared/ContactUsFormWrapper',
  component: ContactUsFormWrapper,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ContactUsFormWrapper>;

export const ContactUsFormWrapperDefault: Story = {
  args: {
    slotLeft: <Contacts variant="contactsPage" />,
    slotRight: <FeedbackForm />,
  },
};

export const ContactUsFormWrapperVariantSecondary: Story = {
  args: {
    slotLeft: <Contacts variant="contactsPage" />,
    slotRight: <FeedbackForm />,
    variant: 'secondary',
  },
};
