import { memo } from 'react';
import cn from 'classnames';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { StarRating } from '@/shared/ui/StarRating';
import styles from './CommentCard.module.scss';
import { Comment } from '../../model/types/Comment';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  variant?: 'product' | 'seller';
}

export const CommentCard = memo(({
  comment,
  variant = 'product',
  className,
}: CommentCardProps) => (
  <FlexCol className={cn(styles.root, styles[variant], className)}>
    <Flex justify="between" align="center">
      <Typography variant="body-3" className={styles.title}>{comment.author.first_name}</Typography>
      <Typography variant="body-3" color="grey">{comment.created_at}</Typography>
    </Flex>
    <StarRating readonly value={comment.rating} className={cn(styles.stars, styles[`stars_${variant}`])} />
    <Typography className={styles.content} variant="body-2" color="grey-dark">
      {comment.content}
    </Typography>
  </FlexCol>
));
