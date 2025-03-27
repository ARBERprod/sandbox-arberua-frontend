import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { AppImage } from '@/shared/ui/AppImage';
import modelImage from '@/shared/assets/images/look-constructor/clothes/model.png';
import { ImageType } from '@/shared/types/common';
import { useTranslation } from 'next-i18next';
import styles from './LookBuilderHero.module.scss';

interface LookConstructorHeroProps {
  className?: string;
  coat: ImageType;
  jacket: ImageType;
  base: ImageType;
  trousers: ImageType;
  shoes: ImageType;

  onCanvasClick?: () => void;
  onBtnClick?: () => void;
  actionsSlot?: ReactNode;
}

export const LookBuilderHero = memo(({
  className,
  shoes,
  trousers,
  base,
  coat,
  jacket,
  actionsSlot,
  onBtnClick,
  onCanvasClick,
}: LookConstructorHeroProps) => {
  const { t } = useTranslation();
  return (
    <div onClick={onCanvasClick} role="presentation" className={cn(styles.root, { [styles.clickable]: Boolean(onCanvasClick) }, className)}>
      <div className={styles.modelWrap}>
        <div className={styles.model}>
          <picture className={styles.modelPicture}>
            <AppImage alt="model" src={modelImage} />
          </picture>
          {coat
          && (
            <div className={cn(styles.clothes, styles.coat)}>
              <picture className={styles.modelPicture}>
                <AppImage alt="model" src={coat} />
              </picture>
            </div>
          )}
          {jacket
          && (
            <div className={cn(styles.clothes, styles.blazer)}>
              <picture className={styles.modelPicture}>
                <AppImage alt="model" src={jacket} />
              </picture>
            </div>
          )}
          {base
          && (
            <div className={cn(styles.clothes, styles.base)}>
              <picture className={styles.modelPicture}>
                <AppImage alt="model" src={base} />
              </picture>
            </div>
          )}
          {trousers
          && (
            <div className={cn(styles.clothes, styles.trousers)}>
              <picture className={styles.modelPicture}>
                <AppImage alt="model" src={trousers} />
              </picture>
            </div>
          )}
          {shoes
          && (
            <div className={cn(styles.clothes, styles.shoes)}>
              <picture className={styles.modelPicture}>
                <AppImage alt="model" src={shoes} />
              </picture>
            </div>
          )}
        </div>
      </div>
      {
        actionsSlot
      && <div className={styles.action}>{actionsSlot}</div>
      }
      {onBtnClick
      && <Button size="large" onClick={onBtnClick} className={styles.btn}>{t('buy-look.btn')}</Button>}
    </div>
  );
});
