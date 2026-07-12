import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { PickupAvailability } from '../../lib/derivePickupAvailability';
import styles from './PickupDiagnostics.module.scss';

interface PickupDiagnosticsProps {
  className?: string;
  availability: PickupAvailability;
  // When provided, each hard-blocker item gets a remove-from-cart action so the
  // shopper can drop the blocking item and unblock pickup. Absent → read-only list.
  onRemoveItem?: (productId: string) => void;
}

type PickupMessageKey =
  | 'pickup.unavailable.stock_check'
  | 'pickup.unavailable.hard_blocker'
  | 'pickup.unavailable.no_common_store'
  | 'pickup.unavailable.default';

// checkout-page i18n keys per unavailable state (precedence handled upstream by
// derivePickupAvailability). Selectable states (idle/loading/available) map to
// nothing → the block is not rendered.
const MESSAGE_KEY: Partial<Record<PickupAvailability['kind'], PickupMessageKey>> = {
  stock_check_unavailable: 'pickup.unavailable.stock_check',
  hard_blocker: 'pickup.unavailable.hard_blocker',
  no_common_store: 'pickup.unavailable.no_common_store',
  unavailable: 'pickup.unavailable.default',
};

// The disable-with-reason block rendered UNDER the delivery radio group; the
// store radio itself is only `disabled`.
export const PickupDiagnostics = memo(({
  className, availability, onRemoveItem,
}: PickupDiagnosticsProps) => {
  const { t } = useTranslation('checkout-page');
  const messageKey = MESSAGE_KEY[availability.kind];
  if (!messageKey) return null;

  // role="status" (polite) not "alert": this surfaces proactively on every
  // availability change (including before store is selected), so it must not
  // assertively interrupt the shopper.
  return (
    <div role="status" className={cn(styles.root, className)}>
      <Typography variant="body-2" color="grey-dark">{t(messageKey)}</Typography>
      {availability.kind === 'hard_blocker' && (
        <ul className={styles.items}>
          {availability.items.map((item) => (
            <li key={item.product_id} className={styles.item}>
              <Typography as="span" variant="body-2">{item.title}</Typography>
              {onRemoveItem && (
                <Button
                  color="light-tertiary"
                  size="xsmall"
                  className={styles.remove}
                  onClick={() => onRemoveItem(item.product_id)}
                >
                  {t('pickup.remove_item')}
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
