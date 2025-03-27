import { memo, useEffect } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { SmallProduct } from '@/entities/Product';
import { routerPaths } from '@/shared/config/router';
import { useSearchActions } from '../../model/slices/searchSlice';
import { SearchProductsGrid } from '../SearchProductsGrid';
import styles from './SearchModal.module.scss';
import { FlexCol } from '@/shared/ui/Flex';
import { Category } from '@/entities/Category';
import Link from 'next/link';
import { measurementsPost, pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { useUserId } from '@/entities/Session';
import { useSearchMutation } from '@/entities/Events';
import { getRandomEventId } from '@/shared/lib/utils/getRandomEventId';

interface SearchModalProps {
  className?: string;
  items: SmallProduct[];
  categories: Category[];
  isEmptySearch?: boolean;
  searchQuery: string;
}

export const SearchModal = memo(({
  className,
  items = [],
  isEmptySearch,
  categories = [],
  searchQuery = '',
}:SearchModalProps) => {
  const { t } = useTranslation();
  const { closeSearch } = useSearchActions();
  const router = useRouter();
  const clientId = useUserId();
  const [searchEvent] = useSearchMutation();

  const productsAccepted = items.length > 0 && !isEmptySearch;
  const goToSearchPage = async () => {
    await router.push(`${routerPaths.search}?q=${searchQuery}`);
    closeSearch();
  };

  useEffect(() => {
    const eventId = getRandomEventId();
    if (typeof window !== 'undefined' && window?.fbq) {
      window?.fbq('track', 'Search', { search_string: searchQuery }, { eventID: eventId });
    }
    searchEvent({
      q: searchQuery,
      eventId,
    });
  }, [searchQuery, searchEvent]);

  useEffect(() => {
    if (productsAccepted && items) {
      const formattedItems = items.map((item) => ({
        id: item.id,
        name: item.title,
        category: item.category,
        brand: item.brand,
        variant: '',
        price: item.price.value,
        quantity: 1,
        currency: 'UAH',
        image: item?.picture || '',
        url: item.url,
      }));

      const itemsMeasurements = items.map((product, index) => ({
        item_id: product.id,
        item_name: product.title,
        affiliation: 'Онлайн-магазин',
        // coupon: '',
        currency: 'UAH',
        // discount: '',
        index,
        item_brand: product.brand,
        item_category: product.category,
        // item_list_id: product.category.id,
        // item_list_name: product.category.title,
        item_variant: product?.skus?.[0]?.title || '',
        price: product.price.value,
        quantity: 1,
      }));

      const params = {
        items: itemsMeasurements,
        // item_list_id: product.category.id,
        // item_list_name: product.category.title,
      };

      pushDataLayerEvent({
        event: 'view_item_list',
        ecommerce: {
          items: formattedItems,
        },
      });

      measurementsPost({
        name: 'view_item_list',
        params,
        client_id: clientId,
      });
    }
  }, [items, productsAccepted, clientId]);

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.inner}>
        <div className={cn(styles.item, styles.first)}>
          <Typography variant="body-3" color="grey-dark" className={styles.title}>{t('search.modal.recomended_goods')}</Typography>
          {productsAccepted ? (
            <SearchProductsGrid
              className={styles.products}
              items={items}
            />
          ) : <Typography className="mb-4">{t('search.modal.nothing_found')}</Typography>}
          {productsAccepted
            && <Button onClick={goToSearchPage}>{t('search.modal.see_more')}</Button>}
        </div>
        <div className={cn(styles.item, styles.second)}>
          <Typography variant="body-3" color="grey-dark" className={styles.title}>{t('search.modal.recomended_categories')}</Typography>
          <FlexCol gap="16">
            {categories.map((category) => (
              <Link href={category.url} key={category.url}>
                <Typography
                  variant="body-2"
                  dangerouslySetInnerHTML={{ __html: category.title }}
                />
              </Link>
            ))}
          </FlexCol>
        </div>
      </div>
    </div>
  );
});
