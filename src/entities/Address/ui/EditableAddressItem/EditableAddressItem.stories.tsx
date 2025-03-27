import type { Meta, StoryObj } from '@storybook/react';
import DeleteIcon from '@/shared/assets/icons/delete-2.svg';
import { Svg } from '@/shared/ui/Svg';
import EditIcon from '@/shared/assets/icons/edit-2.svg';
import { Button } from '@/shared/ui/Button';
import { getMockAddress } from '../../__mock__/getMockAddress';
import { EditableAddressItem } from './EditableAddressItem';

const meta: Meta<typeof EditableAddressItem> = {
  title: 'entities/Address/EditableAddressItem',
  component: EditableAddressItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EditableAddressItem>;

export const EditableAddressItemDefault: Story = {
  args: {
    address: getMockAddress(),
  },
};

export const EditableAddressItemWithActions: Story = {
  args: {
    address: getMockAddress(),
    actionsSlot: () => (
      <>
        <Button
          size="xsmall"
          color="icon"
        >
          <Svg Icon={EditIcon} />
        </Button>
        <Button size="xsmall" color="icon">
          <Svg Icon={DeleteIcon} />
        </Button>
      </>
    ),
  },
};
