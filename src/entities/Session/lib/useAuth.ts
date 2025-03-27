import { useSelector } from 'react-redux';
import { sessionSelectors } from '../model/selectors/sessionSelectors';

export const useAuth = () => {
  const userData = useSelector(sessionSelectors.getUserData);
  const isAuth = Boolean(userData);
  const isLoaded = useSelector(sessionSelectors.getIsSessionDataLoaded);
  const isFetching = useSelector(sessionSelectors.getIsSessionDataFetching);
  const isPopupShowed = useSelector(sessionSelectors.getIsPopupShowed);

  return {
    userData,
    isAuth,
    isLoaded,
    isFetching,
    isPopupShowed,
  };
};
