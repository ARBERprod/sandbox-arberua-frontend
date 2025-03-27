import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Drawer } from '@/shared/ui/Drawer';
import { Typography } from '@/shared/ui/Typography';
import { Divider } from '@/shared/ui/Divider';
import { Button } from '@/shared/ui/Button';
import { routerPaths } from '@/shared/config/router';
import { Loader } from '@/shared/ui/Loader';
import { useTranslation } from 'next-i18next';
import { EmptyCartBody } from '../EmptyCartBody';
import styles from './CartDrawer.module.scss';

interface CartDrawerProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
  isEmpty?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const CartDrawer = ({
  children,
  onClose,
  isOpen,
  actions,
  isEmpty,
  isLoading,
  className,
}: CartDrawerProps) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  const goToCatalog = () => {
    push(routerPaths.main)
      .then(() => {
        onClose();
      });
  };

  const renderContent = () => {
    if (isLoading) return <Loader className={styles.loader} />;
    if (isEmpty) return <EmptyCartBody />;
    return children;
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} withCloseButton anchor="right" className={cn(styles.root, className)}>
      <div className={styles.head}>
        <Typography variant="body-1">{t('cart')}</Typography>
        <Divider className="mt-3 mb-5" />
      </div>
      <div className={styles.body}>
        {renderContent()}
      </div>
      <div className={styles.actions}>
        {isEmpty ? (
          <Button size="large" fullWidth onClick={goToCatalog}>
            {t('checkout.success.btn')}
          </Button>
        ) : actions}
      </div>
    </Drawer>
  );
};
