import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { CallbackSchema } from '../types/CallbackSchema';

const initialState:CallbackSchema = {
  isModalOpen: false,
};

export const callBackSlice = buildSlice({
  name: 'callBack',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
  },
});

export const { reducer: callbackReducer, useActions: useCallbackActions } = callBackSlice;
