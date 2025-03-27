import cn from 'classnames';
import SearchIcon from '@/shared/assets/icons/search-2.svg';
import { Svg } from '@/shared/ui/Svg';
import { useSearchActions } from '../../model/slices/searchSlice';
import styles from './SearchButton.module.scss';

interface SearchButtonProps {
  className?: string;
}

export const SearchButton = ({ className }: SearchButtonProps) => {
  const { openSearch } = useSearchActions();

  const clickHandler = () => {
    openSearch();
  };

  return (
    <button type="button" className={cn(styles.root, className)} onClick={clickHandler}>
      <Svg Icon={SearchIcon} width="24" height="24" />
    </button>
  );
};
