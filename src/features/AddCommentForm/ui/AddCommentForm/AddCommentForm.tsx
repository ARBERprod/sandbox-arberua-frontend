import { memo } from 'react';
import { CommentForm, CommentFormData } from '@/entities/Comment';
import { Portal } from '@/shared/ui/Portal';
import { PageLoader } from '@/shared/ui/Loader';
import { useCommentForm } from '../../lib/useCommentForm';
import { CommentReceiverType } from '../../model/types';

interface AddProductCommentFormProps {
  className?: string;
  onSuccess?: (data: CommentFormData) => void;
  receiverId: string;
  receiverType: CommentReceiverType
}

export const AddCommentForm = memo(({
  className, receiverId, receiverType, onSuccess,
}: AddProductCommentFormProps) => {
  const { isLoading, submitHandler } = useCommentForm({ receiverType, receiverId, onSuccess });

  return (
    <>
      {isLoading
        && (
          <Portal mountInBody>
            <PageLoader />
          </Portal>
        )}
      <CommentForm className={className} onSubmit={submitHandler} />
    </>
  );
});
