import { ProductQuantity } from '@/entities/Product';
import { City, LocationAdapter } from '@/entities/Location';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { TFunction } from 'next-i18next';

export class QuantityUtils {
  static getCityOptions(cities: City[], t:TFunction) {
    const options: SingleSelectOption[] = [
      {
        value: 'all',
        label: t('all-cities'),
      },
    ];

    return options.concat(cities.map(LocationAdapter.mapCityToSelectOption));
  }

  static getQuantitiesCrop(quantities: ProductQuantity[], activeCityId: string) {
    if (activeCityId === 'all') return quantities;

    return quantities.filter((q) => q.id === activeCityId);
  }
}
