import { prepareCheckoutData } from '../prepareCheckoutData';
import { DeliveryMethod } from '../../api/types';
import { CheckoutFormData } from '../../model/types/CheckoutFormData';

const storeMethod: DeliveryMethod = {
  id: 'dm-store', title: 'Самовивіз з магазину', description: null, code: 'store', type: 'storage',
};
const newPostMethod: DeliveryMethod = {
  id: 'dm-np', title: 'Нова Пошта', description: null, code: 'new_post', type: 'storage',
};
const courierMethod: DeliveryMethod = {
  id: 'dm-courier', title: 'Кур\'єр', description: null, code: 'new_post_courier', type: 'address',
};

const deliveryMethods = [storeMethod, newPostMethod, courierMethod];

const baseForm: CheckoutFormData = {
  customer: {
    first_name: 'Іван', last_name: 'Петренко', middle_name: '', phone: '+380000000000', email: 'i@p.ua',
  },
  city_id: 'kyiv',
  payment_method_id: 'cash',
  delivery_method_id: 'dm-store',
  note: '',
  address: { street: '', house: '', flat: '' },
  warehouse_id: 'store-7',
  call_reject: false,
  privacy: true,
  email_subscribe: false,
};

describe('prepareCheckoutData', () => {
  describe('store pickup (regression, Step 3.2/4.2)', () => {
    it('maps warehouse_id → store_id for code=store and does NOT set new_post', () => {
      const dto = prepareCheckoutData(baseForm, deliveryMethods);

      expect(dto.delivery_type).toBe('storage');
      expect(dto.delivery_slug).toBe('store');
      expect(dto.store_id).toBe('store-7');
      expect(dto.new_post).toBeUndefined();
      expect(dto.address).toBeUndefined();
    });
  });

  describe('new_post storage', () => {
    it('maps warehouse_id → new_post for a non-store storage method and does NOT set store_id', () => {
      const dto = prepareCheckoutData(
        { ...baseForm, delivery_method_id: 'dm-np', warehouse_id: 'np-42' },
        deliveryMethods,
      );

      expect(dto.delivery_type).toBe('storage');
      expect(dto.delivery_slug).toBe('new_post');
      expect(dto.new_post).toBe('np-42');
      expect(dto.store_id).toBeUndefined();
    });
  });

  describe('address delivery', () => {
    it('populates the address block and leaves storage fields unset', () => {
      const dto = prepareCheckoutData(
        {
          ...baseForm,
          delivery_method_id: 'dm-courier',
          address: { street: 'Хрещатик', house: '1', flat: '5' },
        },
        deliveryMethods,
      );

      expect(dto.delivery_type).toBe('address');
      expect(dto.address).toEqual({ street: 'Хрещатик', house: '1', flat: '5' });
      expect(dto.store_id).toBeUndefined();
      expect(dto.new_post).toBeUndefined();
      expect(dto.delivery_slug).toBeUndefined();
    });
  });
});
