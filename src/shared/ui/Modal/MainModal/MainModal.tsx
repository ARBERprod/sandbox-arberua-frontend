import { ReactNode } from 'react';
import { ModalProps } from '@/shared/ui/Modal/types/ModalProps';
import { Svg } from '@/shared/ui/Svg';
import BackIcon from '@/shared/assets/icons/arrow-left.svg';
import { Typography } from '@/shared/ui/Typography';
import { Divider } from '@/shared/ui/Divider';
import cn from 'classnames';
import { PaperModal } from '@/shared/ui/Modal/PaperModal';
import styles from './MainModal.module.scss';

interface MainModalProps extends ModalProps {
  className?: string;
  withCloseBtn?: boolean;
  withBackButton?: boolean;
  onBack?: () => void;
  title: string;
  children: ReactNode;
  withDivider?: boolean;

  classes?: {
    title?: string;
    wrapper?: string;
  };
}

export const MainModal = ({
  className,
  title,
  withBackButton,
  onBack,
  withCloseBtn = true,
  children,
  classes,
  withDivider = true,
  ...modalProps
}: MainModalProps) => (
  <PaperModal
    {...modalProps}
    width={modalProps.width || 530}
    withCloseBtn={withCloseBtn}
    className={className}
    classes={classes}
  >
    {withBackButton
      && (
        <button className={styles.backBtn} onClick={onBack}>
          <Svg Icon={BackIcon} stroke="black" width={14} height={16} />
        </button>
      )}
    {title && <Typography className={cn(styles.title, classes?.title)} variant="title-5">{title}</Typography>}
    {withDivider && <Divider className={styles.divider} />}
    {children}
  </PaperModal>
);
