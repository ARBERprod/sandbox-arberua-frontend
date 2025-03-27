export interface City {
  id: string;
  title: string;
  latitude: string;
  longitude: string;
}

export interface Country {
  id: string;
  title: string;
}

export const CITY_COOKIE_KEY = 'city_id';
export const COUNTRY_COOKIE_KEY = 'country';
