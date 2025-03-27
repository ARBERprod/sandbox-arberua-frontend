import { Button, ButtonProps } from '@/shared/ui/Button';
import { Portal } from '@/shared/ui/Portal';
import { PageLoader } from '@/shared/ui/Loader';
import { useTranslation } from 'next-i18next';
import { useAddToCart } from '../lib/useAddToCart/useAddToCart';
import { getRandomEventId } from '@/shared/lib/utils/getRandomEventId';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface AddToCartProps {
  productId: string | string[];
  className?: string;
  children?: string;
  onSuccess?: () => void;
  buttonProps?: Pick<ButtonProps<'button'>, 'color' | 'size' | 'fullWidth' | 'disabled'>;
  onAddToCart?: (eventId: string) => void;
}

export const AddToCardButton = ({
  className,
  productId,
  children,
  onSuccess,
  buttonProps,
  onAddToCart,
}: AddToCartProps) => {
  const {
    isLoading,
    clickHandler,
    isDisabled,
  } = useAddToCart(productId, onSuccess);

  const { t } = useTranslation();

  const addToCartHandler = () => {
    const eventId = getRandomEventId();
    onAddToCart?.(eventId);
    clickHandler(eventId);
  };

  return (
    <>
      {isLoading
        && (
          <Portal mountInBody>
            <PageLoader />
          </Portal>
        )}
      <Button {...buttonProps} disabled={isDisabled} onClick={addToCartHandler} className={className} data-gtm-id="add-to-cart" data-gtm-event="click" data-gtm-action="add_to_cart" data-gtm-product-id={productId}>
        {children
        || `${t('to_cart')}`}
      </Button>
    </>
  );
};
