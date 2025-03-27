import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import { OfficeDataItemText } from '../OfficeDataItemText';
import styles from './OfficeDataItem.module.scss';

interface OfficeDataItemProps {
  className?: string;
  Icon?: ReactNode;
  data?: {title: string; content: string}[];
  slot?: ReactNode;
  onModalOpen?: () => void;
}

export const OfficeDataItem = memo(({
  className,
  Icon,
  data = [],
  slot,
  onModalOpen,
}:OfficeDataItemProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Flex className={styles.wrapper}>
        <div className={cn(styles.item, styles.first)}>
          <div className={styles.image_wrap}>
            {Icon}
          </div>
        </div>

        {slot ? (<div className={cn(styles.item, styles.slot)}>{slot}</div>) : (
          <>
            {!!data.length && data && data.map((item) => (
              <div key={item.toString()} className={styles.item}>
                <OfficeDataItemText
                  title={item.title}
                  content={item.content}
                />
              </div>
            ))}

            <div className={cn(styles.item, styles.last)}>
              <Button
                className={styles.button}
                color="light-secondary"
                size="mediumlarge"
                onClick={onModalOpen}
              >
                {t('office.edit')}

              </Button>
            </div>
          </>
        )}

      </Flex>
    </div>
  );
});
