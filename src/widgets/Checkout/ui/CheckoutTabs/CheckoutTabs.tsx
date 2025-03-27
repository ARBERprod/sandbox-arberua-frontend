import { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import styles from './CheckoutTabs.module.scss';
import { checkoutSelectors } from '../../model/selectors/checkoutSelectors';
import { useCheckoutActions } from '../../model/slices/checkoutSlice';

interface CheckoutTabsProps {
  className?: string;
}

export const CheckoutTabs = memo(({ className }: CheckoutTabsProps) => {
  const currentTab = useSelector(checkoutSelectors.getCurrentTab);
  const { setTab } = useCheckoutActions();
  const { t } = useTranslation('checkout-page');
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.tabs}>
        <Typography
          as="button"
          onClick={() => setTab('new')}
          className={cn(styles.tab, { [styles.active]: currentTab === 'new' })}
        >
          {t('checkout.new-client')}
        </Typography>
        <Typography
          as="button"
          onClick={() => setTab('regular')}
          className={cn(styles.tab, { [styles.active]: currentTab === 'regular' })}
        >
          {t('checkout.regular-customer')}
        </Typography>
      </div>
    </div>
  );
});
