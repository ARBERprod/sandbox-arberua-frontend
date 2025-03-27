import { FC } from 'react';
import cn from 'classnames';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import Link from 'next/link';
import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export const Logo: FC<LogoProps> = ({ className, onClick }) => {
  const clickHandler = () => {
    onClick?.();
  };
  return (
    <Link className={cn(styles.root, className)} href="/" onClick={clickHandler}>
      <LogoIcon />
    </Link>
  );
};
