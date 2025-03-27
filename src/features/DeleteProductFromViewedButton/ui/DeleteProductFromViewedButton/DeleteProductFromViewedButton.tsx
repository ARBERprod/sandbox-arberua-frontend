import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { useConfirmModal } from '@/shared/lib/components/ConfirmModalProvider';
import { Svg } from '@/shared/ui/Svg';
import DeleteIcon from '@/shared/assets/icons/delete-3.svg';
import { useDeleteProductFromHistoryMutation } from '@/entities/Product';
import { PageLoader } from '@/shared/ui/Loader';

interface DeleteProductFromViewedButtonProps {
  className?: string;
  productId: string;
}

export const DeleteProductFromViewedButton = memo(({ className, productId }: DeleteProductFromViewedButtonProps) => {
  const { withConfirm } = useConfirmModal();
  const [deleteProductFromHistory, { isLoading }] = useDeleteProductFromHistoryMutation();
  const { t } = useTranslation();

  const deleteProductFromViewed = () => {
    deleteProductFromHistory({ productId });
  };
  const clickHandler = withConfirm({
    onAccept: deleteProductFromViewed,
    content: t('viewed.deleting_confirm'),
  });
  return (
    <>
      {isLoading && <PageLoader />}
      <button onClick={clickHandler} className={className}>
        <Svg Icon={DeleteIcon} />
      </button>
    </>
  );
});
