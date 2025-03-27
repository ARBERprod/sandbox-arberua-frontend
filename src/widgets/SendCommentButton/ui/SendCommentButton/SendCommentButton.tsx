import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { useAuth } from '@/entities/Session';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { Button } from '@/shared/ui/Button';
import { CommentReceiverType } from '@/features/AddCommentForm';
import { sendCommentButtonReducer, useSendCommentButtonActions } from '../../model/slices/sendCommentButtonSlice';
import { SendCommentModal } from '../SendCommentModal';
import { SendCommentSuccessModal } from '../SendCommentSuccessModal';
import { SendCommentWarningModal } from '../SendCommentWarningModal';

import styles from './SendCommentButton.module.scss';

interface SendCommentButtonProps {
  className?: string;
  receiver: CommentReceiverType;
  entityId: string;
  children?: ReactNode;
}

export const SendCommentButton = ({
  entityId, receiver = 'product', children, className,
}:SendCommentButtonProps) => {
  const { openModal, showWarningModal } = useSendCommentButtonActions();
  const { isAuth } = useAuth();

  const clickHandler = () => {
    if (isAuth && entityId) {
      openModal({ receiver, id: entityId });
    } else {
      showWarningModal({ id: entityId, receiver });
    }
  };
  const { t } = useTranslation();
  return (
    <DynamicModuleLoader reducers={{ sendComment: sendCommentButtonReducer }}>
      <Button color="light-secondary" onClick={clickHandler} className={cn(styles.root, className)}>
        {children || `${t('leave_review')}`}
      </Button>
      <SendCommentModal />
      <SendCommentSuccessModal />
      <SendCommentWarningModal />
    </DynamicModuleLoader>
  );
};
