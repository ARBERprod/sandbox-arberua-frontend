import { memo } from 'react';
import cn from 'classnames';
import { Slide, Slider } from '@/shared/ui/Slider';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { BlogCategory } from '../../model/types';

import styles from './BlogCategories.module.scss';

interface BlogCategoriesProps {
  className?: string;
  categories: BlogCategory[];
}

export const BlogCategories = memo(({
  categories = [],
  className,
}: BlogCategoriesProps) => {
  const { push, asPath } = useRouter();
  const { t } = useTranslation();
  const slides: Slide[] = [
    {
      id: 'all',
      slide: (
        <button
          className={cn(styles.btn, { [styles.active]: asPath === '/blog' })}
          onClick={() => push(routerPaths.blog())}
        >
          <Typography className="" variant="body-2">{t('text.all')}</Typography>
        </button>
      ),
    },

    ...categories.map((category) => ({
      id: category.url,
      slide: (
        <button
          onClick={() => push(category.url)}
          className={cn(styles.btn, { [styles.active]: asPath === category.url })}
        >
          <Typography className="" variant="body-2">{category.title}</Typography>
        </button>
      ),
    })),
  ];

  return (
    <Slider
      className={cn(styles.root, className)}
      slides={slides}
      slidesPerView="auto"
      slideClassName={styles.slide}
      breakpoints={{
        0: {
          spaceBetween: 6,
        },
        1024: {
          spaceBetween: 12,
        },
      }}
      grabCursor
    />
  );
});
