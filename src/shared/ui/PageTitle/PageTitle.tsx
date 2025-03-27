import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Container } from '@/shared/ui/Container';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  className?: string;
  children?: ReactNode;
}

export const PageTitle = memo(({ className, children }:PageTitleProps) => (
  <div className={cn(styles.root, className)}>
    <Container>
      <Typography variant="title-2" className={styles.container}>
        {children}
      </Typography>
    </Container>
  </div>
));
