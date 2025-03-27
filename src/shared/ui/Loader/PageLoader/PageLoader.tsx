import cn from 'classnames';
import styles from './PageLoader.module.scss';
import { Loader } from '../Loader';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }:PageLoaderProps) => (
  <div data-testid="page-loader" className={cn(styles.root, className)}>
    <Loader className={styles.loader} />
  </div>
);
