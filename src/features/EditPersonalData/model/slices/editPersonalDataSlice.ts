import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { EditPersonalDataSchema, EditPersonalDataFormView } from '../types/EditPersonalDataSchema';

const initialState: EditPersonalDataSchema = {
  isModalOpen: false,
  activeEditPersonalDataFormView: null,
};

export const editPersonalDataSlice = buildSlice({
  name: 'editPersonalData',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
      state.activeEditPersonalDataFormView = null;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    setActiveEditPersonalDataFormView: (state, action: PayloadAction<EditPersonalDataFormView | null>) => {
      state.activeEditPersonalDataFormView = action.payload;
    },
  },
});

export const {
  reducer: editPersonalDataReducer,
  useActions: useEditPersonalDataActions,
} = editPersonalDataSlice;
