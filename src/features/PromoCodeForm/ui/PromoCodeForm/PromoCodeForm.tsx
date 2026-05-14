import { memo, useId, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { TextField } from '@/shared/ui/Form/TextField';
import { Button } from '@/shared/ui/Button';
import { Label } from '@/shared/ui/Form/Label';
import { Typography } from '@/shared/ui/Typography';
import {
  cartSelectors,
  getPromocodeErrorKey,
  useApplyPromocodeMutation,
  useRemovePromocodeMutation,
} from '@/entities/Cart';
import { categorizePromocodeError } from '../../lib/categorizePromocodeError';
import styles from './PromoCodeForm.module.scss';

interface PromoCodeFormProps {
  className?: string;
}

const PROFILE_PATH = '/office';

const formatKopecksAsUah = (kopecks: number): string => {
  const whole = Math.trunc(kopecks / 100);
  return whole.toLocaleString('uk-UA');
};

export const PromoCodeForm = memo(({ className }: PromoCodeFormProps) => {
  const [value, setValue] = useState('');
  const inputId = useId();
  const { t } = useTranslation(['checkout-page']);
  const applied = useSelector(cartSelectors.getPromocode);

  const [applyPromocode, applyResult] = useApplyPromocodeMutation();
  const [removePromocode, removeResult] = useRemovePromocodeMutation();

  const isBusy = applyResult.isLoading || removeResult.isLoading;
  const trimmed = value.trim();
  const errorInfo = applyResult.isError ? categorizePromocodeError(applyResult.error) : null;

  if (errorInfo?.kind === 'validation' && errorInfo.code === null) {
    // Forward-compat: log the unrecognised business error for debugging.
    // eslint-disable-next-line no-console
    console.error('[PromoCodeForm] unknown business error payload:', applyResult.error);
  }

  const handleApply = async () => {
    if (!trimmed) return;
    try {
      await applyPromocode({ code: trimmed }).unwrap();
      setValue('');
    } catch {
      // RTK Query stores the error on applyResult.error — UI reads it from there.
    }
  };

  const handleRemove = async () => {
    try {
      await removePromocode().unwrap();
    } catch {
      // Surfaced via removeResult.error — no extra handling here.
    }
  };

  return (
    <div className={cn(styles.root, className)}>
      {applied && (
        <div className={styles.applied}>
          <div className={styles.appliedInfo}>
            <Typography variant="body-1" className={styles.appliedCode}>
              {applied.code}
            </Typography>
            <Typography variant="body-2" color="grey-dark">
              {t('checkout-page:promocode.applied.discount_label', {
                percent: applied.discount,
                amount: formatKopecksAsUah(applied.total_discount),
              })}
            </Typography>
          </div>
          <Button
            color="light-tertiary"
            className={styles.button}
            disabled={isBusy}
            onClick={handleRemove}
          >
            {t('checkout-page:promocode.applied.remove_button')}
          </Button>
        </div>
      )}

      {!applied && errorInfo?.kind === 'cta' && (
        <div className={styles.cta}>
          <Typography variant="body-1">
            {errorInfo.code === 'PROMOCODE_USER_PHONE_MISSING'
              ? t('checkout-page:promocode.cta.phone_missing')
              : t('checkout-page:promocode.cta.client_not_found')}
          </Typography>
          <Link href={PROFILE_PATH} className={styles.ctaLink}>
            {t('checkout-page:promocode.cta.phone_missing_button')}
          </Link>
        </div>
      )}

      {!applied && errorInfo?.kind !== 'cta' && (
        <>
          {errorInfo?.kind === 'service' && (
            <div className={styles.serviceBanner} role="alert">
              <Typography variant="body-2">
                {t('checkout-page:promocode.banner.service_unavailable')}
              </Typography>
            </div>
          )}
          <Label className={styles.label} htmlFor={inputId}>
            {t('checkout-page:promocode.input.label')}
          </Label>
          <div className={styles.wrapper}>
            <TextField
              id={inputId}
              className={styles.field}
              placeholder={t('checkout-page:promocode.input.placeholder')}
              value={value}
              onChange={(_, next) => setValue(next)}
              error={errorInfo?.kind === 'validation'
                ? t(getPromocodeErrorKey(errorInfo.code))
                : undefined}
              disabled={isBusy}
            />
            <Button
              color="light-tertiary"
              onClick={handleApply}
              className={styles.button}
              disabled={isBusy || trimmed.length === 0}
            >
              {t('checkout-page:promocode.input.apply_button')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
});
