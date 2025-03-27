import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Svg } from '@/shared/ui/Svg';
import { useSelector } from 'react-redux';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { OverlayingModal } from '@/shared/ui/Modal';
import CheckIcon from '@/shared/assets/icons/check-tertiary.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { editConsultationSelectors } from '../../model/selectors/editConsultationSelectors';
import { useEditConsultationActions } from '../../model/slices/editConsultationSlice';
import styles from './EditConsultationSuccessModal.module.scss';

interface EditConsultationSuccessModalProps {
  className?: string;
}

export const EditConsultationSuccessModal = memo(({ className }:EditConsultationSuccessModalProps) => {
  const { t } = useTranslation();
  const isOpen = useSelector(editConsultationSelectors.getCurrentModal) === 'success';
  const { closeModal } = useEditConsultationActions();

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
        <Flex justify="center" className={styles.icon_wrap}>
          <div className={styles.icon}>
            <Svg Icon={CheckIcon} stroke="grey-dark" />
          </div>
        </Flex>
        <Typography variant="title-5" centered className={styles.title}>{t('consultation.edit.success_modal.title')}</Typography>
        <Typography variant="body-1" centered className={styles.subtitle}>{t('consultation.edit.success_modal.subtitle')}</Typography>
        <Flex justify="center">
          <Button className={styles.button} size="large" onClick={closeHandler}>{t('ok')}</Button>
        </Flex>
      </div>
    </OverlayingModal>
  );
});
