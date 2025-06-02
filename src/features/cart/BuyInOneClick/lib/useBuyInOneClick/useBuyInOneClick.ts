import { useCallback, useState } from 'react';
import { isValidationError } from '@/shared/types/type-guards';
import { useBuyInOneClickMutation } from '../../api/buyInOneClickApi';
import { useBuyInOneClickCartActions } from '../../model/buyInOneClickCartSlice';
import { useSelector } from 'react-redux';
import { buyInOneClickCartSelectors } from '../../model/buyInOneClickCartSelectors';

export const useBuyInOneClick = () => {
  const { closeCart, clearCartItems, showSuccessModal } = useBuyInOneClickCartActions();
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector(buyInOneClickCartSelectors.getCartItems);
  const [checkout] = useBuyInOneClickMutation();

  const [phone, setPhone] = useState('');
  const [fieldError, setFieldError] = useState('');

  const changeHandler = useCallback((name: string, value: string) => {
    setFieldError('');
    setPhone(value);
  }, []);

  const clickHandler = useCallback(async () => {
    try {
      const items = cartItems.map((item) => ({ product_id: item.owner_id, quantity: item.quantity }));
      setIsLoading(true);
      await checkout({ phone, items }).unwrap();
      clearCartItems();
      closeCart();
      showSuccessModal();
      if (typeof window !== 'undefined' && window?.fbq) {
        // window?.fbq('track', 'Purchase', {
        //   value: cartItems.map((item) => item.price.value).reduce((acc, item) => +acc + +item, 0),
        //   currency: 'UAH',
        //   content_ids: cartItems.map((item) => item.owner_id),
        //   content_name: cartItems.map((item) => item.title),
        //   content_category: cartItems.map((item) => item.category),
        //   content_type: 'product',
        // });
      }
    } catch (e) {
      if (isValidationError(e)) {
        setFieldError(e.data.errors.phone?.[0]);
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [checkout, closeCart, phone]);

  return {
    isLoading,
    fieldError,
    changeHandler,
    phone,
    clickHandler,
  };
};
