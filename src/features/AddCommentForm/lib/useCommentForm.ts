import { CommentFormData, useAddProductCommentMutation, useAddSellerCommentMutation } from '@/entities/Comment';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { useCallback, useMemo } from 'react';
import { CommentReceiverType } from '../model/types';

interface UseCommentFormProps {
  receiverId: string;
  receiverType: CommentReceiverType;
  onSuccess?: (data:CommentFormData) => void;
}

export const useCommentForm = ({ receiverType, receiverId, onSuccess }: UseCommentFormProps) => {
  const [addProductComment, { isLoading: productLoading }] = useAddProductCommentMutation();
  const [addSellerComment, { isLoading: sellerLoading }] = useAddSellerCommentMutation();

  const isLoading = productLoading || sellerLoading;

  const submitHandler = useCallback(async (data: CommentFormData) => {
    try {
      if (receiverType === 'product') {
        await addProductComment({ product_id: receiverId, content: data.content, rating: data.rating }).unwrap();
      } else {
        await addSellerComment({ sellerId: receiverId, content: data.content, rating: data.rating }).unwrap();
      }
      onSuccess?.(data);
    } catch (e) {
      if (
        isValidationError(e)
      ) {
        validationErrorHandler(e);
      }
    }
  }, [addProductComment, addSellerComment, onSuccess, receiverId, receiverType]);

  return useMemo(() => ({
    isLoading,
    submitHandler,
  }), [isLoading, submitHandler]);
};
