import { memo } from 'react';
import { FlexCol } from '@/shared/ui/Flex';
import { StarRating } from '@/shared/ui/StarRating';
import { Typography } from '@/shared/ui/Typography';
import styles from './RatedComment.module.scss';

interface RatedCommentProps {
  className?: string;
  content: string;
  rate: number;
}

export const RatedComment = memo(({ rate, className, content }:RatedCommentProps) => (
  <FlexCol gap="8" className={className}>
    <StarRating value={rate} readonly />
    <Typography className={styles.content} variant="body-2" color="grey-dark">
      {content}
    </Typography>
  </FlexCol>
));
