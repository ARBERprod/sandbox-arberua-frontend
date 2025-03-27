import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Typography } from '@/shared/ui/Typography';
import { Divider } from '@/shared/ui/Divider';
import { RadioField } from '@/shared/ui/Form/RadioField';
import { SortOption } from '@/shared/types/common';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { sortOptionsMapper } from '../../lib/sortOptionsMapper';
import { productSortReducer, useSortActions } from '../../model/slices/sortSlice';
import { productSortSelectors } from '../../model/selectors/productSortSelectors';
import styles from './ProductSort.module.scss';
import { getNewUrl } from '../../lib/getNewUrl';
import { useRouter } from 'next/router';

interface ProductSortProps {
  className?: string;
  options: SortOption[];
}

export const ProductSort = memo(({
  className,
  options = [],
}: ProductSortProps) => {
  const { t } = useTranslation();
  const {
    setOpen,
  } = useSortActions();

  const { replace, asPath, query } = useRouter();

  const updateUrl = (sort: string) => {
    const newUrl = getNewUrl(sort, asPath);

    replace(newUrl, newUrl, {
      scroll: false,
      shallow: true,
    });
  };

  const isOpen = useSelector(productSortSelectors.getIsOpen);

  const closeHandler = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const sortChangeHandler = (name:string, value:string) => {
    updateUrl(value);
    closeHandler();
  };

  const radioOptions = useMemo(() => sortOptionsMapper(options), [options]);

  return (
    <DynamicModuleLoader reducers={{ productSort: productSortReducer }}>
      <Button className={className} onClick={() => setOpen(true)} color="light-secondary">{t('sort')}</Button>
      <Drawer className={styles.root} isOpen={isOpen} onClose={closeHandler} anchor="right" withCloseButton>
        <Typography variant="body-1" centered>{t('sort')}</Typography>
        <Divider className="mt-4 mb-5" />
        <RadioField
          options={radioOptions}
          value={query.sort as string || ''}
          name="sort"
          onChange={sortChangeHandler}
        />
      </Drawer>
    </DynamicModuleLoader>
  );
});
