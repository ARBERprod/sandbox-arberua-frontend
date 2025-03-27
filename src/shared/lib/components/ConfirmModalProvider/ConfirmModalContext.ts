import { createContext, ReactElement } from 'react';
import { AnyFunction } from '@/shared/types/common';

export type OpenModalOptions = {
  onAccept: AnyFunction;
  onCancel?: AnyFunction;
  content: string | ReactElement;
  cancelBtnText?: string;
  acceptBtnText?: string;
}

interface ConfirmModalContextProps {
  openModal: (options: OpenModalOptions) => void;
}

export const ConfirmModalContext = createContext<ConfirmModalContextProps | null>(null);
