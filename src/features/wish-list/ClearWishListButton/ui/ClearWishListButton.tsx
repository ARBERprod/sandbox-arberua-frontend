import { ReactNode } from 'react';
import { Button } from '@/shared/ui/Button';
import { useClearWishListMutation } from '@/entities/WishList';
import { Portal } from '@/shared/ui/Portal';
import { PageLoader } from '@/shared/ui/Loader';
import { useTranslation } from 'next-i18next';
import { useConfirmModal } from '@/shared/lib/components/ConfirmModalProvider';

interface ClearWishListButtonProps {
  className?: string;
  children?: ReactNode;
}

export const ClearWishListButton = ({ className, children }: ClearWishListButtonProps) => {
  const { t } = useTranslation('office-page');
  const [clearWishList, { isLoading }] = useClearWishListMutation();
  const { withConfirm } = useConfirmModal();
  const clickHandler = withConfirm({
    onAccept: () => {
      clearWishList();
    },
    content: t('clear_wishlist_confirm'),
    acceptBtnText: t('yes_clear'),
  });

  return (
    <>
      {isLoading
        && (
          <Portal mountInBody>
            <PageLoader />
          </Portal>
        )}
      <Button
        color="light-secondary"
        size="mediumlarge"
        style={{
          lineHeight: '16px',
        }}
        onClick={clickHandler}
        className={className}
      >
        {children || t('clear_wishlist')}
      </Button>
    </>
  );
};
