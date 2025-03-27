import { PaperModal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import styles from './Popup.module.scss';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Popup = ({ isOpen, onClose }: PopupProps) => {
  const { t } = useTranslation(['common']);
  return (
    <PaperModal classes={styles} width={532} isOpen={isOpen} onClose={onClose}>
      <Typography variant="title-3" className={cn(styles.title)}>{t('popup-report.title')}</Typography>
      <Typography className={cn(styles.subtitle)}>{t('popup-report.text')}</Typography>
      <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdU7OUs2S1B4fKZbp0woqRW_EqO9Geo89W3hhhnfmb25g9RjQ/viewform" rel="noreferrer">
        <Button className={cn(styles.btn)}>{t('popup-report.button-text')}</Button>
      </a>
    </PaperModal>
  );
};
