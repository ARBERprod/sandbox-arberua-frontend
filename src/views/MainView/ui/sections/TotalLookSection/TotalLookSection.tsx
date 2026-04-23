import { memo, useCallback } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { ManWomanBanner } from '@/shared/ui/ManWomanBanner';
import totallookBanner from '@/shared/assets/images/totallook-banner/new-totallook-banner-bg.jpg';
import totallookBannerMan from '@/shared/assets/images/totallook-banner/new-totallook-banner-man.png';
import totallookBannerWoman from '@/shared/assets/images/totallook-banner/new-totallook-banner-woman.png';
import { useTranslation } from 'next-i18next';
import styles from './TotalLookSection.module.scss';
import { GenderTypes } from '@/shared/types/common';

interface TotalLookSectionProps {
    className?: string;
    totalLook?: GenderTypes;
}

export const TotalLookSection = memo(({ className, totalLook }: TotalLookSectionProps) => {
  const { push } = useRouter();
  const { t } = useTranslation('main-page');

  const goToCatalog = useCallback((category?: string) => {
    push(routerPaths.total_look_catalog(category));
  }, [push]);

  return (
    <section className={cn(styles.root, className)}>
      <ManWomanBanner
        backgroundDesktop={totallookBanner}
        backgroundMobile={totallookBanner}
        man={totallookBannerMan}
        woman={totallookBannerWoman}
        title={t('total_look.title')}
        description={t('total_look.text')}
        onManButtonClick={() => goToCatalog(totalLook?.man.value)}
        onWomanButtonClick={() => goToCatalog(totalLook?.women.value)}
        manButtonText={totalLook?.man.title}
        womanButtonText={totalLook?.women.title}
        className={styles.banner}
        colorWhite
        classes={{
          manShadow: styles.manShadow,
          manWrap: styles.manWrap,
          womanWrap: styles.womanWrap,
          womanShadow: styles.womanShadow,
        }}
      />
    </section>
  );
});
