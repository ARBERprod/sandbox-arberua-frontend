import cn from 'classnames';
import { AppImage } from '@/shared/ui/AppImage';
import LoaderImage from '@/shared/assets/images/loader.png';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  centered?: boolean;
  size?: number;
  'data-testid'?: string;
}

export const Loader = ({
  className,
  centered,
  size = 90,
  ...otherProps
}:LoaderProps) => (
  <div
    style={{
      width: size,
      height: size,
    }}
    className={cn(styles.root, { [styles.centered]: centered }, className)}
    data-testid={otherProps['data-testid'] || 'loader'}
  >
    <div className={styles.spinner}>
      <AppImage alt="loading" src={LoaderImage} />
    </div>
  </div>
);
