import { memo } from 'react';
import cn from 'classnames';
import { Label } from '@/shared/ui/Form/Label';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { ShopItem, Shop } from '@/entities/Shop';
import styles from './PickupPointSelect.module.scss';

interface PickupPointSelectProps {
  className?: string;
  name: string;
  value: string;
  points: Shop[];
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  isLoading?: boolean;
  label?: string;
  error?: string;
}

// Pickup-point picker: radio list rendered with the ShopItem card (address +
// schedule). The chosen point id is written into `warehouse_id`
// (prepareCheckoutData maps it to store_id). Empty/unavailable states are
// owned by the parent diagnostics block (Step 3.3), not this component.
export const PickupPointSelect = memo(({
  className,
  name,
  value,
  points,
  onChange,
  onBlur,
  isLoading,
  label,
  error,
}: PickupPointSelectProps) => (
  <div className={cn(styles.root, className)}>
    {label && <Label className={styles.label}>{label}</Label>}
    {isLoading
      ? <Loader size={40} />
      : (
        <div className={styles.list}>
          {points.map((point) => {
            const checked = point.id === value;
            return (
              <label
                key={point.id}
                className={cn(styles.item, { [styles.selected]: checked })}
              >
                <input
                  type="radio"
                  name={name}
                  value={point.id}
                  checked={checked}
                  onChange={() => onChange(name, point.id)}
                  onBlur={() => onBlur?.(name)}
                  className={styles.input}
                />
                <ShopItem shop={point} hideLink className={styles.card} />
              </label>
            );
          })}
        </div>
      )}
    {error && <ErrorMessage error={error} />}
  </div>
));
