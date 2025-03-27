import { memo } from 'react';
import { useSelector } from 'react-redux';
import { SuccessModal } from '@/shared/ui/Modal';
import { buyInOneClickCartSelectors } from '@/features/cart/BuyInOneClick/model/buyInOneClickCartSelectors';
import { useBuyInOneClickCartActions } from '@/features/cart/BuyInOneClick/model/buyInOneClickCartSlice';
import { useTranslation } from 'next-i18next';

interface CartSuccessModalProps {
  className?: string;
}

export const CartSuccessModal = memo(({ className }: CartSuccessModalProps) => {
  const isOpen = useSelector(buyInOneClickCartSelectors.getSuccessModalOpen);
  const { closeSuccessModal } = useBuyInOneClickCartActions();
  const { t } = useTranslation();
  const onClose = () => {
    closeSuccessModal();
  };
  return (
    <SuccessModal className={className} isOpen={isOpen} onClose={onClose} title={t('purchase-was-completed-successfully')} />
  );
});
