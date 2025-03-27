import { useContext } from 'react';
import { ConfirmModalContext, type OpenModalOptions } from './ConfirmModalContext';

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);

  if (!context) throw Error('Cannot use context outside context provider!');

  const withConfirm = (options: OpenModalOptions) => (...args: any[]) => {
    context.openModal({
      content: options.content,
      onAccept: () => options.onAccept.call(null, ...args),
      onCancel: () => options.onCancel?.call(null, ...args),
      cancelBtnText: options.cancelBtnText,
      acceptBtnText: options.acceptBtnText,
    });
  };

  return { withConfirm };
};
