import { memo, useState } from 'react';
import cn from 'classnames';
import { Slide } from '@/shared/ui/Slider';
import { Button } from '@/shared/ui/Button';
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg';
import { Svg } from '@/shared/ui/Svg';
import { SubcategoryLabelsSlider } from '../SubcategoryLabelsSlider';
import { SubcategoryLabelsGrid } from '../SubcategoryLabelsGrid';
import styles from './SubcategoryLabels.module.scss';
import { useTranslation } from 'next-i18next';

interface SubcategoryLabelsProps {
  className?: string;
  slides?: Slide[];
}

export const SubcategoryLabels = memo(({
  className,
  slides = [],
}:SubcategoryLabelsProps) => {
  const [isGrid, setIsGrid] = useState(false);
  const { t } = useTranslation();

  const clickHandler = () => {
    setIsGrid((prev) => !prev);
  };

  if (!slides.length) {
    return null;
  }

  return (
    <div className={cn(styles.root, className)}>
      {isGrid ? (
        <SubcategoryLabelsGrid
          slides={slides}
          className={styles.grid}
        />
      ) : (
        <div className={styles.slider_wrap}>
          <SubcategoryLabelsSlider
            slides={slides}
            className={styles.slider}
          />
        </div>

      )}
      <Button
        className={cn(styles.button, className)}
        size="xsmall"
        variant="rounded-label"
        color="dark"
        onClick={clickHandler}
        endIcon={
          <Svg Icon={isGrid ? ArrowUpIcon : ArrowDownIcon} width="10" height="auto" stroke="white" className={styles.icon} />
        }
      >
        {isGrid ? t('hide') : t('show-all')}
      </Button>
    </div>
  );
});
