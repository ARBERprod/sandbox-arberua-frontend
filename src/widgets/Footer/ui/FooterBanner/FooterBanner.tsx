import { memo } from 'react';
import cn from 'classnames';
import { FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { useTranslation } from 'next-i18next';
import styles from './FooterBanner.module.scss';

interface FooterBannerProps {
  className?: string;
  title: string;
  description: string;
}

export const FooterBanner = memo(({
  className,
  title,
  description,
}: FooterBannerProps) => {
  const { push } = useRouter();
  const onButtonClick = () => {
    push(routerPaths.shops);
  };
  const { t } = useTranslation();
  return (
    <FlexCol align="center" justify="center" className={cn(styles.root, className)}>
      <div className={styles.bg}>
        <video src="/footer.mp4" className={styles.banner} autoPlay loop playsInline muted />
      </div>
      <div className={cn(styles.content)}>
        <Typography variant="title-2" as="h2" color="white" className={cn(styles.title)}>{title}</Typography>
        <Typography color="white" variant="body-2" className={cn(styles.description)}>{description}</Typography>
        <Button size="large" color="light-tertiary" onClick={onButtonClick} className={cn(styles.btn)}>{t('footer.banner.btn')}</Button>
      </div>
    </FlexCol>
  );
});
