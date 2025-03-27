import { memo } from 'react';
import cn from 'classnames';
import { AppImage } from '@/shared/ui/AppImage';
import { BANNERS_DESK, BANNERS_MOB, BANNERS_TABLET } from '../../../constants/banners';
import { useRouter } from 'next/router';
import { Language } from '@/shared/config/lang';
import styles from './BonusesBannerSection.module.scss';

interface BonusesBannerSectionProps {
    className?: string;
}

export const BonusesBannerSection = memo(({ className }: BonusesBannerSectionProps) => {
  const { locale } = useRouter();
  return (
    <div className={cn(styles.root, className)}>
      <AppImage
        src={BANNERS_DESK[locale as Language]}
        alt="banner"
        className={cn(styles.banner, styles.desktop)}
      />
      <AppImage
        src={BANNERS_TABLET[locale as Language]}
        alt="banner"
        className={cn(styles.banner, styles.tablet)}
      />
      <AppImage
        src={BANNERS_MOB[locale as Language]}
        alt="banner"
        className={cn(styles.banner, styles.mobile)}
      />
    </div>
  );
});
