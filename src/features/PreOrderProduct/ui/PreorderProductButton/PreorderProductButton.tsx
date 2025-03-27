import { Button, ButtonProps } from '@/shared/ui/Button';
import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import { usePreorderProductActions } from '../../model/preorderProductSlice';

interface PreorderProductButtonProps {
  className?: string;
  children?: ReactNode;
  productId: string;
  buttonProps?: Pick<ButtonProps<'button'>, 'color' | 'size' | 'fullWidth'>;
}

export const PreorderProductButton = ({
  className,
  productId,
  children,
  buttonProps,
}: PreorderProductButtonProps) => {
  const { t } = useTranslation();
  const { openModal, setProductId } = usePreorderProductActions();
  const clickHandler = () => {
    openModal();
    setProductId(productId);
  };
  return (
    <Button size="large" fullWidth onClick={clickHandler} className={className} {...buttonProps}>
      {children || `${t('preorder.btn')}`}
    </Button>
  );
};
