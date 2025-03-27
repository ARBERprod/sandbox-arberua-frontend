import type { Meta, StoryObj } from '@storybook/react';
import { AddToCardButton } from '../../../../features/cart/AddToCart';
import { CertificateCard } from './CertificateCard';
import { mockedCertificate } from '../../constants/mockedCertificates';

const meta: Meta<typeof CertificateCard> = {
  title: 'Entities/CertificateCard/CertificateCard',
  component: CertificateCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CertificateCard>;

export const CertificateCardDefault: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <CertificateCard {...mockedCertificate} />
    </div>
  ),
};

export const CertificateCardWithActions: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <CertificateCard
        {...mockedCertificate}
        slots={{
          cartActions: (actionsProps) => (
            <AddToCardButton
              {...actionsProps}
              buttonProps={{
                size: 'medium',
                color: 'light-primary',
              }}
            />
          ),
        }}
      />
    </div>
  ),
};
