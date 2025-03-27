import { CommentReceiverType } from '@/features/AddCommentForm';

export type CommentModalType = 'feedback' | 'success' | 'warning';

export interface SendCommentButtonSchema {
  receiver: CommentReceiverType;
  activeModal: CommentModalType | null;
  entityId: string | null;
}
