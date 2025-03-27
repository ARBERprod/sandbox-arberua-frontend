import type { Meta, StoryObj } from '@storybook/react';
import { CertificatesView } from './CertificatesView';

const meta: Meta<typeof CertificatesView> = {
  title: 'views/CertificatesView',
  component: CertificatesView,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CertificatesView>;

export const CertificatesViewDefault: Story = {

};
