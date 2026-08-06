import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { AppImage } from '@/shared/ui/AppImage';
import { Card } from '@/shared/ui/Card';
import { CardView } from '@/shared/types/common';
import { LabelCollaboration } from './LabelCollaboration';

const meta: Meta<typeof LabelCollaboration> = {
  title: 'shared/LabelCollaboration',
  component: LabelCollaboration,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LabelCollaboration>;

export const LabelCollaborationDefault: Story = {
  args: {
    label: 'ARBER × Partner',
  },
};

// The tightest corner in the app: CardView.SMALL caps the badge stack at 60% of the card,
// so the longest string the admin panel allows (18 chars) has to wrap here, not stretch the card.
export const LabelCollaborationLongOnSmallCard: Story = {
  render: () => (
    <div style={{ width: 180 }}>
      <Card
        view={CardView.SMALL}
        title="Сорочка"
        sale={30}
        badges={<LabelCollaboration label="ARBER × Kyivstyles" />}
        imageSlot={(
          <AppImage
            src={faker.image.imageUrl()}
            unoptimized
            alt="product"
            lazy
          />
        )}
      />
    </div>
  ),
};
