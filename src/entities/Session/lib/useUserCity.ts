import { useSelector } from 'react-redux';
import { sessionSelectors } from '../model/selectors/sessionSelectors';

export const useUserCity = () => {
  const userCity = useSelector(sessionSelectors.getUserCity);
  return userCity;
};
