import { memo } from 'react';
import cn from 'classnames';
import { ReviewTable } from '../ReviewTable';
import { ReviewList } from '../ReviewList';
import styles from './OfficeReviewsView.module.scss';

interface OfficeReviewsViewProps {
  className?: string;
}

export const OfficeReviewsView = memo(({ className }:OfficeReviewsViewProps) => (
  <div className={cn(styles.root, className)}>
    <ReviewTable className="hide-mobile-tablet" />
    <ReviewList className="hide-desktop" />
  </div>
));
