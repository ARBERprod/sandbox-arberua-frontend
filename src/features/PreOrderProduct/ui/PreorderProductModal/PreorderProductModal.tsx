import cn from 'classnames';
import styles from './PreorderProductModal.module.scss';
import { MainModal } from '@/shared/ui/Modal';
import { PreorderProductForm } from '../PreorderProductForm';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { preorderProductSelectors } from '../../model/preorderProductSelectors';
import { usePreorderProductActions } from '../../model/preorderProductSlice';

interface PreorderProductModalProps {
  className?: string;
}

export const PreorderProductModal = ({ className }: PreorderProductModalProps) => {
  const { t } = useTranslation();

  const { closeModal } = usePreorderProductActions();
  const isOpen = useSelector(preorderProductSelectors.getActiveModal) === 'form';

  const closeHandler = () => {
    closeModal();
  };
  return (
    <MainModal
      lazy
      title={t('preorder.modal.title')}
      withDivider
      width={530}
      centered
      unmountOnClose
      isOpen={isOpen}
      onClose={closeHandler}
      className={cn(styles.root, className)}
    >
      <div className={styles.container}>
        <PreorderProductForm />
      </div>
    </MainModal>
  );
};
