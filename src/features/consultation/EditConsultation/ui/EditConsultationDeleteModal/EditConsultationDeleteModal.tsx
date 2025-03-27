import { memo } from 'react';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { OverlayingModal } from '@/shared/ui/Modal';
import { Svg } from '@/shared/ui/Svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { useTranslation } from 'next-i18next';
import { useEditConsultationActions } from '../../model/slices/editConsultationSlice';
import { editConsultationSelectors } from '../../model/selectors/editConsultationSelectors';
import styles from './EditConsultationDeleteModal.module.scss';

interface EditConsultationDeleteModalProps {
  className?: string;
}

export const EditConsultationDeleteModal = memo(({ className }:EditConsultationDeleteModalProps) => {
  const { closeModal, setActiveModal } = useEditConsultationActions();
  const isOpen = useSelector(editConsultationSelectors.getCurrentModal) === 'deleting-confirm';
  const { t } = useTranslation();

  const onDeleteConfirmationClickHandler = () => {
  };

  const onDeleteCancelClickHandler = () => {
    setActiveModal('form');
  };

  const closeHandler = () => {
    closeModal();
  };

  return (
    <OverlayingModal
      isOpen={isOpen}
      onClose={closeHandler}
      className={cn(styles.overlay, className)}
      centered
      unmountOnClose
      fullScreenMobile
      width={532}
    >
      <div className={cn(styles.root, className)}>
        <button className={styles.close_btn} onClick={closeHandler}>
          <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
        </button>
        <Typography
          centered
          className={styles.title}
        >
          {t('consultant.deleting_confirm')}
        </Typography>
        <Flex gap="12" justify="center">
          <Button
            className={styles.button}
            size="large"
            color="light-secondary"
            fullWidth
            onClick={onDeleteConfirmationClickHandler}
          >
            {t('yes_delete')}
          </Button>
          <Button
            className={styles.button}
            size="large"
            fullWidth
            onClick={onDeleteCancelClickHandler}
          >
            {t('cancel')}
          </Button>
        </Flex>
      </div>
    </OverlayingModal>
  );
});
