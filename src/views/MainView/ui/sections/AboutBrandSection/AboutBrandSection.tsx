import { memo } from 'react';
import cn from 'classnames';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import brandImage from '@/shared/assets/images/brand.jpg';
import { useTranslation } from 'next-i18next';
import styles from './AboutBrandSection.module.scss';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';

interface AboutBrandSectionProps {
  className?: string;
}

export const AboutBrandSection = memo(({ className }: AboutBrandSectionProps) => {
  const { t } = useTranslation('main-page');
  const { push } = useRouter();
  return (
    <section className={cn(styles.root, className)}>
      <div className={styles.left}>
        <div className={styles.imageWrap}>
          <AppImage src={brandImage} alt="brand" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.content}>
          <Typography variant="title-2">{t('about_brand.title')}</Typography>
          <Typography variant="body-2" className={styles.description}>
            {t('about_brand.text1')}
            <span className="hide-mobile">
              <br />
              <br />
              {t('about_brand.text2')}
            </span>
          </Typography>
          <Button onClick={() => push(routerPaths.about)} className={styles.btn} size="large">
            {t('about_brand.button')}
          </Button>
        </div>
      </div>
    </section>
  );
});
