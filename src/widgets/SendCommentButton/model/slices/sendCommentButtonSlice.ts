import { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { CommentReceiverType } from '@/features/AddCommentForm';
import { SendCommentButtonSchema } from '../types/sendCommentButtonSchema';

const initialState:SendCommentButtonSchema = {
  receiver: 'product',
  activeModal: null,
  entityId: null,
};

export const sendCommentButtonSlice = buildSlice({
  name: 'send-comment',
  initialState,
  reducers: {
    openModal: (state, action:PayloadAction<{receiver: CommentReceiverType, id: string}>) => {
      state.receiver = action.payload.receiver;
      state.entityId = action.payload.id;
      state.activeModal = 'feedback';
    },
    showWarningModal: (state, action: PayloadAction<{id: string, receiver: CommentReceiverType}>) => {
      state.activeModal = 'warning';
      state.entityId = action.payload.id;
      state.receiver = action.payload.receiver;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.entityId = null;
    },
    showSuccessModal: (state) => {
      state.activeModal = 'success';
      state.entityId = null;
    },
  },
});

export const { reducer: sendCommentButtonReducer } = sendCommentButtonSlice;
export const { useActions: useSendCommentButtonActions } = sendCommentButtonSlice;
