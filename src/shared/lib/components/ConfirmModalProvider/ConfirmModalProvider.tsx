import {
  memo, ReactElement, ReactNode, useCallback, useMemo, useState,
} from 'react';
import { noop } from '@/shared/lib/utils/noop';
import { ConfirmModal } from '@/shared/ui/Modal';
import { ConfirmModalContext, type OpenModalOptions } from './ConfirmModalContext';

interface ConfirmModalProviderProps {
  children: ReactNode;
}

export const ConfirmModalProvider = memo(({ children }: ConfirmModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string | ReactElement>('');
  const [acceptCallback, setAcceptCallback] = useState(() => noop);
  const [cancelCallback, setCancelCallback] = useState(() => noop);
  const [accessBtnText, setAccessBtnText] = useState('');
  const [cancelBtnText, setCancelBtnText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    if (isLoading) return;
    setIsOpen(false);
    setContent('');
    setAcceptCallback(() => noop);
    setCancelCallback(() => noop);
    setAccessBtnText('');
    setCancelBtnText('');
  };

  const onConfirm = async () => {
    setIsLoading(true);
    await acceptCallback();
    setIsLoading(false);
    closeModal();
  };

  const onCancel = async () => {
    setIsLoading(true);
    await cancelCallback();
    setIsLoading(false);
    closeModal();
  };

  const openModal = useCallback(({
    onCancel,
    content,
    onAccept,
    cancelBtnText,
    acceptBtnText,
  }: OpenModalOptions) => {
    setContent(content);
    setAcceptCallback(() => onAccept);
    if (cancelBtnText) {
      setCancelBtnText(cancelBtnText);
    }
    if (acceptBtnText) {
      setAccessBtnText(acceptBtnText);
    }
    if (onCancel) {
      setCancelCallback(() => onCancel);
    }
    setIsOpen(true);
  }, []);

  const providedValue = useMemo(() => ({
    openModal,
  }), [openModal]);
  return (
    <ConfirmModalContext.Provider value={providedValue}>
      <ConfirmModal
        content={content}
        onAccept={onConfirm}
        isOpen={isOpen}
        onClose={closeModal}
        onCancel={onCancel}
        acceptBtnText={accessBtnText}
        cancelBtnText={cancelBtnText}
      />
      {children}
    </ConfirmModalContext.Provider>
  );
});
