import { memo } from 'react';
import cn from 'classnames';
import NotFoundImage from '@/shared/assets/images/not-found.png';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { Container } from '@/shared/ui/Container';
import { useTranslation } from 'next-i18next';
import styles from './NotFoundView.module.scss';

interface NotFoundViewProps {
  className?: string;
}

export const NotFoundView = memo(({ className }: NotFoundViewProps) => {
  const { push } = useRouter();
  const goToHome = () => {
    push(routerPaths.main);
  };
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <div className={styles.imageWrap}>
          <AppImage alt="not-found" src={NotFoundImage} className={styles.image} />
        </div>
        <Typography variant="title-1" className={styles.title}>{t('404.title')}</Typography>
        <Typography variant="body-3" className={styles.subtitle}>
          {t('404.text1')}
        </Typography>
        <Typography variant="body-3" className={styles.text}>
          {t('404.text2')}
        </Typography>
        <Button size="large" className={styles.btn} onClick={goToHome}>{t('404.button')}</Button>
      </Container>
    </div>
  );
});
