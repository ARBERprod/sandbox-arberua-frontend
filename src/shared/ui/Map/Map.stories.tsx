import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './Map';
import styles from './Map.module.scss';

const meta: Meta<typeof Map> = {
  title: 'shared/Map',
  component: Map,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Map>;

export const MapDefault: Story = {
  render: () => (
    <Map
      className={styles.story}
      center={{
        lat: 50.4089118,
        lng: 30.5471138,
      }}
    />
  ),
};
