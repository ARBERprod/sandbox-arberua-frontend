import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from '@/shared/ui/Button';
import { FilterDrawer, FilterItem } from '@/entities/Filter';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { AccordionItem } from '@/shared/ui/Accordion/AccordionItem';
import { useTranslation } from 'next-i18next';
import { FilterInitializer } from '../FilterInitializer';
import { FilterItemProxy } from '../FilterItemProxy';
import { productFilterReducer, useFilterActions } from '../../model/slices/filterSlice';
import { productFilterSelectors } from '../../model/selectors/productFilterSelectors';

interface ProductFilterProps {
  className?: string;
  filters: FilterItem[];
  basePath: string;
  filtersMode?: 'seo' | 'query';
}

export const ProductFilter = memo(({
  className,
  filters = [],
  basePath,
  filtersMode = 'seo',
}: ProductFilterProps) => {
  const { t } = useTranslation();
  const { setOpen, resetFilters } = useFilterActions();
  const isOpen = useSelector(productFilterSelectors.getIsOpen);
  const { replace } = useRouter();
  const closeHandler = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const resetFiltersHandler = () => {
    replace(basePath, undefined, { scroll: false });
    resetFilters();
    closeHandler();
  };

  return (
    <DynamicModuleLoader destroyOnUnmount reducers={{ productFilter: productFilterReducer }}>
      <FilterInitializer filters={filters}>
        <Button className={className} onClick={() => setOpen(true)} color="light-secondary">{t('filter')}</Button>
        <FilterDrawer
          isOpen={isOpen}
          onCancel={resetFiltersHandler}
          onClose={closeHandler}
          onAccept={closeHandler}
          filtersSlot={filters.map((filter) => (
            <AccordionItem
              key={filter.title}
              title={filter.title}
              content={<FilterItemProxy filtersMode={filtersMode} filter={filter} />}
            />
          ))}
        />
      </FilterInitializer>
    </DynamicModuleLoader>
  );
});
