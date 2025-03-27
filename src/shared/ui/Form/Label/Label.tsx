import { HTMLAttributes, ReactNode } from 'react';
import { Typography } from '@/shared/ui/Typography';
import cn from 'classnames';
import styles from './Label.module.scss';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  className?: string;
  htmlFor?: string;
  children?: ReactNode;
}

export const Label = (props: LabelProps) => {
  const {
    children,
    className,
    htmlFor,
    ...rest
  } = props;
  return (
    <Typography
      variant="label"
      htmlFor={htmlFor}
      className={cn(styles.root, className)}
      aria-label="label"
      {...rest}
    >
      {children}
    </Typography>
  );
};
