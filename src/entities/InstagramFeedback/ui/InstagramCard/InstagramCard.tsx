import { memo, MouseEvent } from 'react';
import cn from 'classnames';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import { Instagram } from '../../model/types/types';
import styles from './InstagramCard.module.scss';
import Link from 'next/link';
import { useInstagramFeedbackActions } from '../../model/slices/instagramFeedbackSlice';

interface InstagramCardProps {
  className?: string;
  instagram: Instagram;
  showDetailsOnClick?: boolean;
}

export const InstagramCard = memo(({ className, showDetailsOnClick = true, instagram }:InstagramCardProps) => {
  const { openModal } = useInstagramFeedbackActions();
  const clickHandler = (e: MouseEvent) => {
    if (showDetailsOnClick) {
      e.preventDefault();
      openModal(instagram);
    }
  };

  return (
    <Link
      href={instagram.instagram.url}
      className={cn(styles.root, className)}
      onClick={clickHandler}
      target="_blank"
    >
      <div className={styles.inner}>
        <div className={styles.img_wrap}>
          <AppImage className={styles.image} alt="instagram" unoptimized src={instagram?.picture} />
        </div>
        <div className={styles.content}>
          <Typography variant="body-1" color="white" className={styles.title}>{instagram.instagram.id}</Typography>
        </div>
      </div>
    </Link>
  );
});
