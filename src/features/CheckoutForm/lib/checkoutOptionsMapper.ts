import { RadioOption } from '@/shared/ui/Form/RadioField';
import { DeliveryMethod, PaymentMethod, Warehouse } from '../api/types';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField';

class CheckoutOptionsMapper {
  mapPaymentMethodToOptions(method: PaymentMethod): RadioOption {
    return {
      value: method.id,
      label: method.title,
    };
  }

  mapDeliveryMethodToOptions(method: DeliveryMethod): RadioOption {
    return {
      value: method.id,
      label: method.title,
    };
  }

  mapWarehouseToSelectOption(warehouse: Warehouse): SingleSelectOption {
    return {
      value: warehouse.id,
      label: warehouse.title,
    };
  }
}

export const checkoutOptionsMapper = new CheckoutOptionsMapper();
