import { memo } from 'react';
import { FlexCol } from '@/shared/ui/Flex';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { PageLoader } from '@/shared/ui/Loader';
import { useBuyInOneClick } from '../../lib/useBuyInOneClick';
import { CartSuccessModal } from '@/features/cart/BuyInOneClick/ui/CartSuccessModal';

interface BuyInOneClickProps {
  className?: string;
}

export const BuyInOneClick = memo(({ className }: BuyInOneClickProps) => {
  const { t } = useTranslation();
  const {
    isLoading,
    fieldError,
    changeHandler,
    phone,
    clickHandler,
  } = useBuyInOneClick();
  return (
    <>
      {isLoading && <PageLoader />}
      <FlexCol data-testid="BuyInOneClick" gap="8" fullWidth className={className}>
        <PhoneField error={fieldError} name="phone" onChange={changeHandler} value={phone} />
        <Button size="large" fullWidth onClick={clickHandler}>{t('buy')}</Button>
      </FlexCol>
      <CartSuccessModal />
    </>
  );
});
