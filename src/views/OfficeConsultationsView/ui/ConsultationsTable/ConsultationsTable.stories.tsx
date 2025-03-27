import type { Meta, StoryObj } from '@storybook/react';
import { ConsultationsTable } from './ConsultationsTable';

const meta: Meta<typeof ConsultationsTable> = {
  title: 'views/OfficeConsultationsView/ConsultationsTable',
  component: ConsultationsTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ConsultationsTable>;

export const ConsultationsTableDefault: Story = {

};
