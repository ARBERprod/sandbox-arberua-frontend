export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  lazy?: boolean;
  unmountOnClose?: boolean;
  centered?: boolean;
  width?: string | number;
  rootClassName?: string;
  'data-testid'?: string;
}
