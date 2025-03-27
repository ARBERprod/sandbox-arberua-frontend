import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import styles from './OfficeDataItemText.module.scss';

interface OfficeDataItemTextProps {
  className?: string;
  title?: string;
  content?: string;
}

export const OfficeDataItemText = memo(({
  className,
  title,
  content,
}:OfficeDataItemTextProps) => (
  <div className={cn(styles.root, className)}>
    <Typography variant="body-2" color="grey-dark-3">{title}</Typography>
    <Typography variant="body-2">{content}</Typography>
  </div>
));
