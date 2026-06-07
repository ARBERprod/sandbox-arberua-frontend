import { useCallback, useState } from 'react';
import { isBusinessError, isValidationError } from '@/shared/types/type-guards';
import { useErrorNotification } from '@/shared/ui/Notification/useErrorNotification';
import { useBuyInOneClickMutation } from '../../api/buyInOneClickApi';
import { useBuyInOneClickCartActions } from '../../model/buyInOneClickCartSlice';
import { useSelector } from 'react-redux';
import { buyInOneClickCartSelectors } from '../../model/buyInOneClickCartSelectors';

export const useBuyInOneClick = () => {
  const { closeCart, clearCartItems, showSuccessModal } = useBuyInOneClickCartActions();
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector(buyInOneClickCartSelectors.getCartItems);
  const [checkout] = useBuyInOneClickMutation();
  const { notify } = useErrorNotification();

  const [phone, setPhone] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const changeHandler = useCallback((field: string, value: string) => {
    if (field === 'name') {
      setNameError('');
      setName(value);
      return;
    }
    if (field === 'phone') {
      setFieldError('');
      setPhone(value);
    }
  }, []);

  const clickHandler = useCallback(async () => {
    try {
      const items = cartItems.map((item) => ({ product_id: item.owner_id, quantity: item.quantity }));
      setIsLoading(true);
      await checkout({ phone, name, items }).unwrap();
      clearCartItems();
      closeCart();
      showSuccessModal();
      setPhone('');
      setName('');
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
        setFieldError(e.data.errors.phone?.[0] ?? '');
        setNameError(e.data.errors.name?.[0] ?? '');
      } else if (isBusinessError(e) && e.data.error.message) {
        // BE returns a localized "contact support" message for failed orders
        notify({ title: e.data.error.message });
      } else {
        notify();
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [checkout, closeCart, phone, name, notify]);

  return {
    isLoading,
    fieldError,
    changeHandler,
    phone,
    name,
    nameError,
    clickHandler,
  };
};
