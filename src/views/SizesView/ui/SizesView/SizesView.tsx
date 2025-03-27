import { memo, useRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Breadcrumps } from '@/shared/ui/Breadcrumps';
import Link from 'next/link';
import { routerPaths } from '@/shared/config/router';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { ManWomanSwitcherButtons } from '@/shared/ui/ManWomanSwitcherButtons';
import { Svg } from '@/shared/ui/Svg';
import InfoIcon from '@/shared/assets/icons/info.svg';
import { MeasurementsInfo } from '@/entities/Size';
import { scrollToRef } from '@/shared/lib/utils/scrollToRef';
import { SizesTableProxy } from '../SizesTableProxy';
import styles from './SizesView.module.scss';
import { SizesViewContainer } from '../SizesViewContainer';

interface SizesViewProps {
  className?: string;
  hideBreadcrumps?: boolean;
  hideSizeInfo?: boolean;
}

export const SizesView = memo(({ className, hideBreadcrumps = false, hideSizeInfo = false }: SizesViewProps) => {
  const { t } = useTranslation(['sizes', 'common']);
  const infoRef = useRef<HTMLDivElement>(null);
  const [chosenTab, setChosenTab] = useState<'man' | 'woman' | 'shoes'>('man');
  const tabs = [
    {
      title: t('common:man_clothes'),
      slug: 'man',
    },
    {
      title: t('common:woman_clothes'),
      slug: 'woman',
    },
    {
      title: t('common:shoes'),
      slug: 'shoes',
    },
  ];

  const goToInfo = () => {
    scrollToRef(infoRef);
  };

  return (
    <div className={cn(styles.root, className)}>
      <SizesViewContainer className={styles.container}>
        {!hideBreadcrumps && (
          <Breadcrumps className={styles.breadcrumbs}>
            <Link href={routerPaths.main}>
              <Typography variant="body-2" as="span">
                {t('common:main')}
              </Typography>
            </Link>
            <Typography variant="body-2" color="grey-dark">
              {t('sizes:sizes_grid')}
            </Typography>
          </Breadcrumps>
        )}
        <Typography variant="title-2" centered className={styles.title}>{t('sizes:sizes_grid')}</Typography>
        <Flex gap="24" direction="column" className={styles.row}>
          <ManWomanSwitcherButtons
            tabs={tabs}
            chosenTab={chosenTab}
            setChosenTab={(tab) => setChosenTab(tab as 'man' | 'woman' | 'shoes')}
          />
          {!hideSizeInfo && (
            <Typography onClick={goToInfo} centered color="grey-dark" variant="body-2" as="button" className={styles.infoBtn}>
              <Svg width={20} height={20} Icon={InfoIcon} />
              {' '}
              {t('sizes:size_info')}
            </Typography>
          )}
        </Flex>
        <SizesTableProxy variant={chosenTab} />
        <div className={styles.info} ref={infoRef}>
          <MeasurementsInfo variant={chosenTab} />
        </div>
      </SizesViewContainer>
    </div>
  );
});
