import { memo, useState } from 'react';
import cn from 'classnames';
import { ManWomanSwitcherButtons } from '@/shared/ui/ManWomanSwitcherButtons';
import { useRouter } from 'next/router';
import { useGetCollectionsQuery } from '@/entities/Collection';
import { useTranslation } from 'next-i18next';
import { Loader } from '@/shared/ui/Loader';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { CatalogPagination, usePaginate } from '@/widgets/CatalogPagination';
import { ParamsService } from '@/shared/lib/services/params.service';
import { routerPaths } from '@/shared/config/router';
import { CollectionsSection } from '../sections/CollectionsSection';
import styles from './CollectionsView.module.scss';
import { GenderTypes } from '@/shared/types/common';

interface CollectionsViewProps {
  className?: string;
}

export const CollectionsView = memo(({ className }:CollectionsViewProps) => {
  const { t } = useTranslation(['common', 'collections']);
  const { query, push } = useRouter();
  const [chosenTab, setChosenTab] = useState(query.gender as string || undefined);

  const {
    pageChangeHandler,
    merge,
    moreBtnClickHandler,
  } = usePaginate();

  const setChosenTabHandler = (slug: string) => {
    setChosenTab(slug);
    push(routerPaths.collections(slug));
  };

  const {
    data, isError, isLoading, isFetching,
  } = useGetCollectionsQuery({
    merge,
    filters: new ParamsService(query, 'gender').stringifyParams(),
    type: chosenTab,
  });

  const getTabs = (types: GenderTypes) => Object.values(types).map(({ value, title }) => ({ slug: value, title }));

  if (isLoading) return <Loader size={48} centered />;
  if (isError || !data) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <Flex justify="center">
        <PageBreadcrumbs breadcrumbs={data.data.breadcrumbs} className={styles.bc} />
      </Flex>

      <Typography variant="title-1" centered className={styles.title}>
        {t('collections:heading')}
      </Typography>
      <ManWomanSwitcherButtons
        className={styles.switcher}
        chosenTab={chosenTab || ''}
        setChosenTab={setChosenTabHandler}
        tabs={getTabs(data.data.types)}
      />

      {data.data.collections.map((collection) => (
        <CollectionsSection
          key={collection.id}
          className={styles.section}
          products={collection.products}
          title={collection.title}
          href={collection.url}
          picture={collection.picture}
        />
      ))}
      <CatalogPagination
        className={styles.pagination}
        isFetching={isFetching}
        totalPages={data.meta.page.total}
        currentPage={data.meta.page.current}
        onButtonClick={moreBtnClickHandler}
        onPageChange={pageChangeHandler}
      />
    </div>
  );
});
