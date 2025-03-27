import { memo } from 'react';
import cn from 'classnames';
import { Comment, RatedComment } from '@/entities/Comment';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import styles from './ReviewTableCommentCell.module.scss';

interface ReviewTableCommentProps {
  className?: string;
  comment?: Pick<Comment, 'rating' | 'content'>;
}

export const ReviewTableCommentCell = memo(({ className, comment }: ReviewTableCommentProps) => {
  const { t } = useTranslation();
  if (!comment) {
    return (
      <Button
        className={cn(styles.root, className)}
        color="light-secondary"
      >
        {t('write_review')}
      </Button>
    );
  }
  return (
    <RatedComment
      content={comment.content}
      rate={comment.rating}
      className={cn(styles.root, className)}
    />
  );
});
