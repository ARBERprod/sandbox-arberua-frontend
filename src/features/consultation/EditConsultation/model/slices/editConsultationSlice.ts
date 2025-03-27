import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { EditConsultationModalType, EditConsultationSchema } from '../types/EditConsultationSchema';

const initialState: EditConsultationSchema = {
  currentModal: null,
  isModalVisible: true,
  consultation: null,
};

const editConsultationSlice = buildSlice({
  name: 'editConsultation',
  initialState,
  reducers: {
    openModal: (state) => {
      state.currentModal = 'form';
      state.isModalVisible = true;
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.isModalVisible = true;
      state.consultation = null;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
    },
    showModal: (state) => {
      state.isModalVisible = true;
    },
    setActiveModal: (state, action: PayloadAction<EditConsultationModalType>) => {
      state.currentModal = action.payload;
    },
  },
});

export const {
  useActions: useEditConsultationActions,
  reducer: editConsultationReducer,
} = editConsultationSlice;
