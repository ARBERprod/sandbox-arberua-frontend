import { memo } from 'react';
import cn from 'classnames';
import { Post } from '../../model/types';
import { PostCard } from '../PostCard';

import styles from './PostsGrid.module.scss';

interface ArticlesGridProps {
  className?: string;
  articles: Post[];
}

export const PostsGrid = memo(({
  articles = [],
  className,
}: ArticlesGridProps) => (
  <div className={cn(styles.root, className)}>
    {articles.map((article) => (<PostCard className={styles.article} article={article} key={article.url} />))}
  </div>
));
