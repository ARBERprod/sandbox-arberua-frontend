import React, {
  MouseEvent, useEffect, useMemo, useRef, useId,
} from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import SearchIcon from '@/shared/assets/icons/search-2.svg';
import CloseIcon from '@/shared/assets/icons/close-3.svg';
import { Svg } from '@/shared/ui/Svg';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import { useDebouncedValue } from '@/shared/lib/hooks/debounce/useDebouncedValue';
import { useBodyOverflow } from '@/shared/lib/components/FloatingProvider';
import { useSearchActions } from '../../model/slices/searchSlice';
import { useGetSearchResultQuery } from '../../api/searchApi';
import { searchSelectors } from '../../model/selectors/searchSelectors';
import { SearchModal } from '../SearchModal';
import styles from './SearchField.module.scss';
import { SearchInput } from '@/shared/ui/Form/SearchField';
import { useRouter } from 'next/router';
import { VoiceSearch } from '@/features/VoiceSearch';

export interface SearchFieldProps {
  name: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchField = ({
  name,
  placeholder,
  disabled,
  className,
}: SearchFieldProps) => {
  const {
    setSearchFieldValue, closeModal, closeSearch, openModal,
  } = useSearchActions();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const isModalOpen = useSelector(searchSelectors.getIsModalOpen);
  const isSearchOpen = useSelector(searchSelectors.getIsSearchOpen);
  const searchFieldValue = useSelector(searchSelectors.getSearchFieldValue);
  const router = useRouter();

  const modalId = useId();

  useBodyOverflow({
    elementId: modalId,
    condition: isModalOpen,
    unlockOnUnmount: true,
  });

  const changeFieldHandler = (name: string, value: string) => {
    setSearchFieldValue(value);
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const debouncedSearchValue = useDebouncedValue(searchFieldValue, 300);

  const {
    data,
    originalArgs,
  } = useGetSearchResultQuery(
    { search: debouncedSearchValue },
    { skip: debouncedSearchValue.trim().length < 2 },
  );

  useEffect(() => {
    closeSearch();
    setSearchFieldValue('');
  }, [closeSearch, router, setSearchFieldValue]);

  useEffect(() => {
    if (!data || debouncedSearchValue === '') {
      closeModal();
    } else {
      openModal();
    }
  }, [closeModal, debouncedSearchValue, openModal, data]);

  const closeButtonClickHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setSearchFieldValue('');

    if (isModalOpen) {
      closeModal();
    } else {
      closeSearch();
    }
  };

  const clickFieldHandler = () => {
    if (!data || debouncedSearchValue === '') return;
    openModal();
  };

  const fieldRef = useRef(null);
  const modalRef = useRef(null);
  useOutsideClick({
    elementRef: fieldRef,
    triggerRef: modalRef,
    onOutsideClick: () => {
      closeModal();
    },
    enabled: isSearchOpen,
  });

  const foundProducts = useMemo(() => {
    if (!debouncedSearchValue.trim() || !data) return [];
    return data.data.products;
  }, [data, debouncedSearchValue]);

  const foundCategories = useMemo(() => {
    if (!debouncedSearchValue.trim() || !data) return [];
    return data.data.categories;
  }, [data, debouncedSearchValue]);
  return (
    <>
      {isModalOpen && <div className={styles.bg} />}
      <div
        className={cn(styles.root, className)}
        onClick={clickFieldHandler}
        role="presentation"
        ref={fieldRef}
      >
        <div className={cn(styles.wrapper)}>
          <div className={cn(styles['input-wrapper'])}>
            <SearchInput
              ref={searchInputRef}
              name={name}
              value={searchFieldValue}
              className={cn(styles.field)}
              placeholder={placeholder}
              disabled={disabled}
              onChange={changeFieldHandler}
            />
          </div>
          <button
            className={cn(styles['icon-wrapper'], styles['icon-wrapper-search'])}
            type="button"
            data-name={name}
          >
            <Svg Icon={SearchIcon} width="24" height="24" />
          </button>
          <button
            className={cn(styles['icon-wrapper'], styles['icon-wrapper-close'])}
            onClick={closeButtonClickHandler}
            data-name={name}
            data-value={searchFieldValue}
          >
            <Svg Icon={CloseIcon} width="24" height="24" />
          </button>
        </div>
        {isModalOpen && (
          <div ref={modalRef}>
            <SearchModal
              searchQuery={debouncedSearchValue}
              categories={foundCategories}
              items={foundProducts}
              isEmptySearch={originalArgs?.search === ''}
            />
          </div>
        )}

      </div>
    </>
  );
};
