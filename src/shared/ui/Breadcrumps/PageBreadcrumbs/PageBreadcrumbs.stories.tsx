import type { Meta, StoryObj } from '@storybook/react';
import { PageBreadcrumbs } from './PageBreadcrumbs';

const meta: Meta<typeof PageBreadcrumbs> = {
  title: 'Example/PageBreadcrumbs',
  component: PageBreadcrumbs,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PageBreadcrumbs>;

export const PageBreadcrumbsDefault: Story = {

};
