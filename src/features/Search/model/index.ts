import { useSelector } from 'react-redux';
import { searchSelectors } from './selectors/searchSelectors';

export const useSearchModel = () => {
  const isSearchOpen = useSelector(searchSelectors.getIsSearchOpen);

  return {
    isSearchOpen,
  };
};
