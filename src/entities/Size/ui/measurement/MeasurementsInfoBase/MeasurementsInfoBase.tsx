import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { AppImage } from '@/shared/ui/AppImage';
import { ImageType } from '@/shared/types/common';
import { ALPHABET } from '@/shared/constants/common';
import { useTranslation } from 'next-i18next';
import styles from './MeasurementsInfo.module.scss';
import { MeasurementItem } from '../../../model/types';

interface MeasurementsInfoBaseProps {
  className?: string;
  picture: ImageType;
  children?: ReactNode;
  content?: MeasurementItem[];
}

export const MeasurementsInfoBase = memo(({
  className, picture, content = [], children,
}:MeasurementsInfoBaseProps) => {
  const { t } = useTranslation('sizes');
  return (
    <div className={cn(styles.root, className)}>
      <Typography variant="title-4" centered className={styles.title}>{t('size_info')}</Typography>
      <Flex
        align="center"
        justify="between"
        gap="28"
        direction={{
          'mobile-tablet': 'column-reverse',
          desktop: 'row',
        }}
      >
        <div className={styles.info}>
          {children || (
            <FlexCol gap="32">
              {content.map((item, index) => (
                <FlexCol key={item.title} gap="12">
                  <Flex gap="8" align="center">
                    <div className={styles.letter}>
                      <Typography color="white" style={{ marginTop: '2px' }} variant="body-2">{ALPHABET[index].toUpperCase()}</Typography>
                    </div>
                    <Typography variant="title-6">{item.title}</Typography>
                  </Flex>
                  <Typography variant="body-1">{item.content}</Typography>
                </FlexCol>
              ))}
            </FlexCol>
          )}
        </div>
        <div className={styles.image}>
          <AppImage alt="measurements" src={picture} />
        </div>
      </Flex>
    </div>
  );
});
