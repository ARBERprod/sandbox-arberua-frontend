import type { Meta, StoryObj } from '@storybook/react';
import { mockedCertificates } from '@/entities/Certificate';
import { CertificateCardList } from './CertificateCardList';

const meta: Meta<typeof CertificateCardList> = {
  title: 'widgets/Certificate/CertificateCardList',
  component: CertificateCardList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CertificateCardList>;

export const CertificateCardListDefault: Story = {
  args: {
    items: mockedCertificates,
  },
};
