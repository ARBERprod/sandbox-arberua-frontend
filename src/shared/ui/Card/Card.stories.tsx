import type { Meta, StoryObj } from '@storybook/react';
import { Favourites } from '@/shared/ui/Favourites';
import { Card } from './Card';
import styles from '@/entities/Product/ui/ProductCard/ProductCard.module.scss';
import { faker } from '@faker-js/faker';
import { CardHoverImage } from '@/shared/ui/Card/components/CardHoverImage';
import { AppImage } from '@/shared/ui/AppImage';

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Card>;

const qty = 23;

export const CardWithFooter: Story = {
  args: {
    title: 'Мужской Look',
    actions: <div><Favourites quantity={qty} /></div>,
    footer: <div>2 товара</div>,
    imageSlot: <AppImage
      src={faker.image.imageUrl()}
      unoptimized
      alt="seller.user_name"
      lazy
    />,
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const CardWithoutFooter: Story = {
  args: {
    title: 'Мужской Look',
    actions: <div><Favourites quantity="23" /></div>,
    footer: '',
    imageSlot: <AppImage
      src={faker.image.imageUrl()}
      unoptimized
      alt="seller.user_name"
      lazy
    />,
  },
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};

export const CardWithHoverImage: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Card
        title="Мужской Look"
        imageSlot={(
          <CardHoverImage
            classes={{
              image: styles.image,
              hoverImage: styles.hoverImage,
            }}
            title="product.title"
            image={faker.image.imageUrl()}
            hoverImage={faker.image.imageUrl()}
          />
        )}
      />
    </div>
  ),
  decorators: [
    (Story) => <div style={{ maxWidth: '400px' }}><Story /></div>,
  ],
};
