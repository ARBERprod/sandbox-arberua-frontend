import { memo } from 'react';
import cn from 'classnames';
import { ImageType } from '@/shared/types/common';
import { Typography } from '@/shared/ui/Typography';
import { AppImage } from '@/shared/ui/AppImage';
import styles from './AboutBrandSection.module.scss';

interface AboutBrandSectionProps {
  className?: string;
  variant?: 'left' | 'right';
  title?: string;
  list?: string[];
  image?: ImageType | null;
}

export const AboutBrandSection = memo(({
  className, variant = 'left', title, list, image,
}:AboutBrandSectionProps) => {
  const variantClassname = `variant_${variant}`;
  return (
    <div className={cn(styles.root, styles[variantClassname], className)}>
      <div className={cn(styles.item, styles['m-primary'])}>
        <div className={styles.item_content}>
          <Typography variant="title-3" className={styles.title}>{title}</Typography>
          <ul className={styles.list}>
            {!!list?.length && list?.map((item) => (
              <li key={new Date().valueOf()} className={styles.list_item}>
                <Typography variant="body-1">{item}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cn(styles.item, styles['m-secondary'])}>
        <div className={styles.image_wrap}>
          <AppImage unoptimized src={image} alt="brand" className={styles.image} />
        </div>
      </div>
    </div>
  );
});
