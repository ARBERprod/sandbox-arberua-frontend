import { memo } from 'react';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import cn from 'classnames';
import styles from './FaqTabSingle.module.scss';
import { Svg } from '@/shared/ui/Svg';

interface FaqTabSingleProps {
  className?: string;
  id: string;
  title: string;
  icon?: any;
  currentTab?: string | null;
  isActive?: boolean;
  onClick?: (id: string) => void;
}

export const FaqTabSingle = memo(({
  className,
  id,
  title,
  icon,
  currentTab,
  isActive = false,
  onClick,
}:FaqTabSingleProps) => {
  const onClickHandler = (id: string) => {
    onClick?.(id);
  };

  const isChecked = currentTab === id || isActive;

  return (
    <Button
      className={cn(styles.root, {
        [styles.active]: isChecked,
      }, className)}
      startIcon={(
        icon
        && (
          <Svg
            className={styles.icon}
            Icon={icon}
            width={48}
            height={48}
          />
        )
      )}
      onClick={() => onClickHandler(id)}
      size="largexxl"
      color="light-quaternary"
      variant="tab"
      active={isChecked}
    >
      <Typography as="span" className={styles.btn_inner}>{title}</Typography>
    </Button>
  );
});
