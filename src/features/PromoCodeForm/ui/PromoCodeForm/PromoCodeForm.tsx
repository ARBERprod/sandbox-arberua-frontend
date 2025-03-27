import {
  memo, useId, useState,
} from 'react';
import { TextField } from '@/shared/ui/Form/TextField';
import { Button } from '@/shared/ui/Button';
import { isValidationError } from '@/shared/types/type-guards';
import { useTranslation } from 'next-i18next';
import { Label } from '@/shared/ui/Form/Label';
import { usePromoCodeMutation } from '../../api/promoCodeApi';
import { useLazySessionFetchQuery } from '@/entities/Session';
import cn from 'classnames';
import styles from './PromoCodeForm.module.scss';
import { Typography } from '@/shared/ui/Typography';

interface PromoCodeFormProps {
    className?: string;
}

export const PromoCodeForm = memo(({ className }: PromoCodeFormProps) => {
  const [promocode, setPromocode] = useState<string>('');
  const [isPromoCode, setIsPromoCode] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const inputId = useId();
  const { t } = useTranslation(['checkout-page']);
  const [promoCode] = usePromoCodeMutation();
  const [fetchSession] = useLazySessionFetchQuery();

  const handleSubmit = async () => {
    if (!promocode.trim()) {
      setError(t('checkout-page:checkout.enter-promo-code'));
      return;
    }

    try {
      await promoCode({ promocode }).unwrap();
      setIsPromoCode(promocode);
      setError(undefined);
      setPromocode('');
      await fetchSession();
    } catch (e: any) {
      if (isValidationError(e)) {
        const promoCodeError = e.data.errors?.promocode?.[0] || t('checkout-page:checkout.enter-promo-code');
        setError(promoCodeError);
      } else {
        setError(t('checkout-page:checkout.enter-promo-code'));
      }
    }
  };

  return (
    <div className={cn(styles.root, className)}>
      <Label className={styles.label} htmlFor={inputId}>
        {t('checkout-page:gift-certificate')}
      </Label>
      <div className={styles.wrapper}>
        <TextField
          id={inputId}
          className={styles.field}
          placeholder={t('checkout-page:checkout.enter-code')}
          value={promocode}
          onChange={(_, value) => setPromocode(value)}
          error={error}
        />
        <Button
          color="light-tertiary"
          onClick={handleSubmit} // Обработчик клика
          className={styles.button}
        >
          {t('checkout-page:checkout.use')}
        </Button>
      </div>
      {isPromoCode && (
        <Typography variant="body-1" className={styles.info}>
          {t('checkout-page:checkout.use_info')}
          <Typography variant="body-1" as="span">{isPromoCode}</Typography>
        </Typography>
      )}
    </div>
  );
});
