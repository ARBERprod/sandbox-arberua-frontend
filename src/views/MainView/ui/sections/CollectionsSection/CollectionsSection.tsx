import { memo, useCallback } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { ManWomanBanner } from '@/shared/ui/ManWomanBanner';
import collectionsBanner from '@/shared/assets/images/collection-banner/new-collection-banner-bg.jpg';
import collectionsBannerMan from '@/shared/assets/images/collection-banner/new-collection-banner-man.png';
import collectionsBannerWoman from '@/shared/assets/images/collection-banner/new-collection-banner-woman.png';
import { useTranslation } from 'next-i18next';
import styles from './CollectionsSection.module.scss';
import { GenderTypes } from '@/shared/types/common';

interface CollectionsSectionProps {
    className?: string;
    collections?: GenderTypes;
}

export const CollectionsSection = memo(({ className, collections }: CollectionsSectionProps) => {
  const { t } = useTranslation('main-page');
  const { push } = useRouter();
  const goToCatalog = useCallback((category?: string) => {
    push(routerPaths.collections(category));
  }, [push]);

  return (
    <section className={cn(styles.root, className)}>
      <ManWomanBanner
        backgroundDesktop={collectionsBanner}
        backgroundMobile={collectionsBanner}
        man={collectionsBannerMan}
        woman={collectionsBannerWoman}
        title={t('collections.title')}
        description={t('collections.text')}
        onManButtonClick={() => goToCatalog(collections?.man.value)}
        onWomanButtonClick={() => goToCatalog(collections?.women.value)}
        manButtonText={collections?.man.title}
        womanButtonText={collections?.women.title}
        classes={{ womanElement: styles.womanElement }}
        variant="secondary"
      />
    </section>
  );
});
