import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { PersonalDataModal } from './PersonalDataModal';
import { EditPersonalDataFormView } from '../../model/types/EditPersonalDataSchema';

const meta: Meta<typeof PersonalDataModal> = {
  title: 'features/editPersonalData/PersonalDataModal',
  component: PersonalDataModal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PersonalDataModal>;

export const PersonalDataModalDefault: Story = {
  decorators: [
    StoreDecorator({
      editPersonalData: {
        activeEditPersonalDataFormView: EditPersonalDataFormView.PERSONAL_DATA_FORM,
        isModalOpen: true,
      },
    }),
  ],
};
