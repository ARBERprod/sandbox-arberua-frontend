import type { Meta, StoryObj } from '@storybook/react';
import UserIcon from '@/shared/assets/icons/user-2.svg';
import PhoneIcon from '@/shared/assets/icons/phone-4.svg';
import EmailIcon from '@/shared/assets/icons/envelope-3.svg';
import LockIcon from '@/shared/assets/icons/lock.svg';
import LocationIcon from '@/shared/assets/icons/location-2.svg';
import { OfficeDataAddresses } from '@/views/OfficeView/ui/OfficeDataAddresses';
import { Svg } from '@/shared/ui/Svg';
import { OfficeDataItem } from './OfficeDataItem';

const meta: Meta<typeof OfficeDataItem> = {
  title: 'widgets/office/OfficeDataItem',
  component: OfficeDataItem,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OfficeDataItem>;

export const OfficeDataItemUserPersonalData: Story = {
  args: {
    Icon: <Svg Icon={UserIcon} width="48" height="48" />,
    data: [
      {
        title: 'ФІО',
        content: 'Дмитро Дмитрук',
      },
      {
        title: 'Стать',
        content: 'чоловічий',
      },
      {
        title: 'Дата народження',
        content: '18.08.1980',
      },
    ],
  },
};

export const OfficeDataItemUserPhoneData: Story = {
  args: {
    Icon: <Svg Icon={PhoneIcon} width="48" height="48" />,
    data: [
      {
        title: 'Номер телефону',
        content: '0689571818',
      },
    ],
  },
};

export const OfficeDataItemUserEmailData: Story = {
  args: {
    Icon: <Svg Icon={EmailIcon} width="48" height="48" />,
    data: [
      {
        title: 'E-mail',
        content: 'test@test.com',
      },
    ],
  },
};

export const OfficeDataItemUserPasswordData: Story = {
  args: {
    Icon: <Svg Icon={LockIcon} width="48" height="48" />,
    data: [
      {
        title: 'Пароль',
        content: '********',
      },
    ],
  },
};

export const OfficeDataItemUserAddressesData: Story = {
  args: {
    Icon: <Svg Icon={LocationIcon} width="48" height="48" />,
    slot: <OfficeDataAddresses />,
  },
};
