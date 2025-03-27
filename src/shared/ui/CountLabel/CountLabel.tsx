import cn from 'classnames';
import styles from './CountLabel.module.scss';

interface CountLabelProps {
  className?: string;
  count?: number;
}

export const CountLabel = ({ className, count }:CountLabelProps) => {
  if (!count || Number(count) === 0) return null;
  return (
    <div className={cn(styles.root, className)}>
      <span style={{
        marginTop: '2px',
      }}
      >
        {count}
      </span>
    </div>
  );
};
