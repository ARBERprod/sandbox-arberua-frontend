import { SuccessModal } from '@/shared/ui/Modal';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { preorderProductSelectors } from '../../model/preorderProductSelectors';
import { usePreorderProductActions } from '../../model/preorderProductSlice';

interface PreorderProductSuccessModalProps {
  className?: string;
}

export const PreorderProductSuccessModal = ({ className }: PreorderProductSuccessModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = usePreorderProductActions();
  const isOpen = useSelector(preorderProductSelectors.getActiveModal) === 'success';
  const closeHandler = () => {
    closeModal();
  };
  return (
    <SuccessModal
      className={className}
      isOpen={isOpen}
      title={t('preorder.modal.success.title')}
      text={t('preorder.modal.success.subtitle')}
      onClose={closeHandler}
    />
  );
};
