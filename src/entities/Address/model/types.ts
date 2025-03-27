import { City, Country } from '@/entities/Location/model/types/city';

export interface Address {
  id: string;
  index: string;
  house: string;
  flat: string;
  country: Country;
  city: City;
  street: string;
}
