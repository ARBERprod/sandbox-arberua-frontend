import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { AppImage } from '@/shared/ui/AppImage';
import Link from 'next/link';
import styles from './PostCard.module.scss';
import { Post } from '../../model/types';

interface ArticleCardProps {
  className?: string;
  article: Post;
}

export const PostCard = memo(({
  article,
  className,
}: ArticleCardProps) => (
  <div className={cn(styles.root, className)}>
    <div className={styles.imageWrap}>
      <div className={styles.backdrop} />
      <Link href={article.url} className={styles.link}>
        <AppImage unoptimized alt={article.title} src={article.picture} className={styles.image} />
      </Link>
      <div className={styles.label}>
        <Typography variant="body-2">
          {article.reading_time || '-'}
        </Typography>
      </div>
    </div>
    <div className={styles.info}>
      <Typography
        variant="title-5"
      >
        {article.title}
      </Typography>
      <Typography
        color="grey-dark"
        variant="body-2"
      >
        {article.created_at}
      </Typography>
    </div>
  </div>
));
