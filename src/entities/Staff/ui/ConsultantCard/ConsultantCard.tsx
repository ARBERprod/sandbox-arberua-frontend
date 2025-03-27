import { memo } from 'react';
import cn from 'classnames';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import styles from './ConsultantCard.module.scss';
import { ImageType } from '@/shared/types/common';

interface ConsultantCardProps {
  className?: string;
  consultant: {
    picture: ImageType;
    user_name: string;
  };
  variant?: 'normal' | 'small';
}

export const ConsultantCard = memo(({
  consultant,
  className,
  variant = 'normal',
}: ConsultantCardProps) => (
  <div className={cn(styles.root, className)}>
    <Flex gap="12" align="center">
      <div className={cn(styles.image, styles[variant])}>
        <AppImage unoptimized alt={consultant.user_name} src={consultant.picture} />
      </div>
      <FlexCol gap="8">
        <Typography weight={500} variant="body-3" className={cn(styles.title, styles[variant])}>
          {consultant.user_name}
        </Typography>
      </FlexCol>
    </Flex>
  </div>
));
