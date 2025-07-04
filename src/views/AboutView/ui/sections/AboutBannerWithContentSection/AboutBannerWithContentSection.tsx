import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { TypographyVariants } from '@/shared/ui/Typography/Typography';
import { Container } from '@/shared/ui/Container';
import { AppImage } from '@/shared/ui/AppImage';
import { ImageType } from '@/shared/types/common';
import styles from './AboutBannerWithContentSection.module.scss';

interface AboutBannerWithContentSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  Image?: ImageType | null;
  variant?: 'primary' | 'secondary';
}

export const AboutBannerWithContentSection = memo(({
  className, Image, title = '', subtitle, variant = 'primary',
}:AboutBannerWithContentSectionProps) => {
  let titleVariant = 'primary';
  let variantClassName = '';
  if (variant === 'primary') {
    titleVariant = 'title-2';
    variantClassName = 'primary';
  } else if (variant === 'secondary') {
    titleVariant = 'title-2';
    variantClassName = 'secondary';
  }

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.bg}>
        <AppImage unoptimized src={Image} alt={title} className={styles.image} />
      </div>
      <div className={cn(styles.content, styles[variantClassName])}>
        <Container className={styles.container}>
          <Typography variant={titleVariant as TypographyVariants} color="white" className={cn(styles.title, styles[variantClassName])}>
            {title}
          </Typography>
          <Typography variant="title-5" color="white" className={cn(styles.subtitle, styles[variantClassName])}>
            {subtitle}
          </Typography>
        </Container>
      </div>
    </div>
  );
});
