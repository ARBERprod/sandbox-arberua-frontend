import { City, Country } from '../model/types/city';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField';

export class LocationAdapter {
  public static mapCityToSelectOption(city: City): SingleSelectOption {
    return {
      label: city.title,
      value: city.id,
    };
  }

  public static mapCountryToSelectOption(country: Country): SingleSelectOption {
    return {
      label: country.title,
      value: country.id,
    };
  }
}
