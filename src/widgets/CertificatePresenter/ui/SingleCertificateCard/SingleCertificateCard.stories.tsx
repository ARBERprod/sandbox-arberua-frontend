import type { Meta, StoryObj } from '@storybook/react';
import { mockedCertificate } from '@/entities/Certificate';
import { SingleCertificateCard } from './SingleCertificateCard';

const meta: Meta<typeof SingleCertificateCard> = {
  title: 'widgets/Certificate/SingleCertificateCard',
  component: SingleCertificateCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SingleCertificateCard>;

export const SingleCertificateCardDefault: Story = {
  args: {
    ...mockedCertificate,
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
