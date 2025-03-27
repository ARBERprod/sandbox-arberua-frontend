import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  SignUpForConsultationModalType,
  SignUpForConsultationSchema,
} from '../types/SignUpForConsultationSchema';
import { ConsultationType } from '@/entities/Consultation';
import { Staff } from '@/entities/Staff';

const initialState: SignUpForConsultationSchema = {
  currentModal: null,
  isModalVisible: true,
  format: 'online',
  consultantId: '',
  shopId: '',
  consultants: [],
  isConsultantBlocked: false,
};

const signUpForConsultationSlice = buildSlice({
  name: 'signUpForConsultation',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        format: ConsultationType,
        consultantId?: string,
        consultants: Staff[],
        shopId: string,
        blockConsultant: boolean,
      }>,
    ) => {
      state.currentModal = 'form';
      state.isModalVisible = true;
      state.format = action.payload.format;
      state.consultants = action.payload.consultants;
      state.consultantId = action.payload.consultantId || '';
      state.shopId = action.payload.shopId || '';
      state.isConsultantBlocked = action.payload.blockConsultant;
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.isModalVisible = true;
      state.consultants = [];
      state.consultantId = '';
      state.shopId = '';
      state.isConsultantBlocked = false;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
    },
    showModal: (state) => {
      state.isModalVisible = true;
    },
    setActiveModal: (state, action: PayloadAction<SignUpForConsultationModalType>) => {
      state.currentModal = action.payload;
    },
  },
});

export const {
  useActions: useSignUpForConsultationActions,
  reducer: signUpForConsultationReducer,
} = signUpForConsultationSlice;
