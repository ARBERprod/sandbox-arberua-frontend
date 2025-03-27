import { Address } from '../model/types';

export const getFullAddress = (
  address: Address,
  // eslint-disable-next-line max-len
) => `${address.country.title}, ${address.city.title}, ${address.street}, ${address.house}, ${address.flat}. ${address.index}`;
