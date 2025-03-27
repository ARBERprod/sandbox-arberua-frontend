import { memo } from 'react';
import cn from 'classnames';
import { Comment, CommentCard } from '@/entities/Comment';
import { Divider } from '@/shared/ui/Divider';
import styles from './CommentsList.module.scss';

interface CommentsListProps {
  className?: string;
  comments: Comment[];
  variant?: 'product' | 'seller';
}

export const CommentsList = memo(({
  comments = [],
  variant = 'product',
  className,
}: CommentsListProps) => (
  <ul className={cn(styles.root, styles[variant], className)}>
    {comments.map((comment) => (
      <li className={cn(styles.item, styles[`item_${variant}`])} key={comment.id}>
        <CommentCard className="w-full" comment={comment} variant={variant} />
        <Divider className={cn(styles.divider, styles[`divider_${variant}`])} />
      </li>
    ))}
  </ul>
));
