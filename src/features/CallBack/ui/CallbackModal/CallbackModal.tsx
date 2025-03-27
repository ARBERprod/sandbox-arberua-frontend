import { memo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { Portal } from '@/shared/ui/Portal';
import { PageLoader } from '@/shared/ui/Loader';
import { useSendCallbackMutation } from '../../api/callbackApi';
import { CallbackFormData } from '../../model/types/CallbackFormData';
import { CallbackForm } from '../CallbackForm';
import { callbackSelectors } from '../../model/selectors/callbackSelectors';
import { callbackReducer, useCallbackActions } from '../../model/slices/callBackSlice';
import styles from './CallbackModal.module.scss';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/shared/ui/Notification';

interface CallbackModalProps {
  className?: string;
  onSuccess?: () => void;
}

export const CallbackModal = memo(({ className, onSuccess }: CallbackModalProps) => {
  const isOpen = useSelector(callbackSelectors.getIsModalOpen);
  const { notify } = useNotification({ type: 'success' });
  const { t } = useTranslation();
  const [sendCallback, { isLoading }] = useSendCallbackMutation();
  const { closeModal } = useCallbackActions();
  const closeHandler = () => {
    closeModal();
  };
  const onSubmit = async (data:CallbackFormData) => {
    try {
      await sendCallback({
        phone: data.phone,
        user_name: data.first_name,
      }).unwrap();
      closeModal();
      notify({ title: t('callback.success'), content: t('callback.success-text') });
      onSuccess?.();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };
  return (
    <DynamicModuleLoader reducers={{ callback: callbackReducer }}>
      {
        isLoading && (
          <Portal mountInBody>
            <PageLoader />
          </Portal>
        )
      }
      <MainModal
        width={530}
        onClose={closeHandler}
        title={t('callback')}
        isOpen={isOpen}
        unmountOnClose
        className={cn(styles.root, className)}
        centered
      >
        <CallbackForm className={styles.form} onSubmit={onSubmit} />
      </MainModal>
    </DynamicModuleLoader>
  );
});
