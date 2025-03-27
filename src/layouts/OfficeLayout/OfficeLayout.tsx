import { ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { MainLayout } from '@/layouts/MainLayout';
import { OfficeContainer } from '@/widgets/OfficeContainer';
import { OfficeNavigation, officeMenu } from '@/widgets/OfficeNavigation';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import ChevronLeftIcon from '@/shared/assets/icons/chevron-l.svg';
import { Svg } from '@/shared/ui/Svg';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { routerPaths } from '@/shared/config/router';
import { useTranslation } from 'next-i18next';

import { Container } from '@/shared/ui/Container';
import styles from './OfficeLayout.module.scss';

interface OfficeLayoutProps {
  className?: string;
  children: ReactNode;
  additionalContent?: ReactElement;

  classes?: {
    container?: string;
  }
}

export const OfficeLayout = ({
  className, children, classes, additionalContent,
}: OfficeLayoutProps) => {
  const isDesktop = useMediaQuery(breakpoints.desktop);
  const { t } = useTranslation('office-page');
  const { push, asPath } = useRouter();
  const pageTitle = officeMenu(t).find((item) => item.href === asPath)?.label;
  const goToMenu = () => {
    push(routerPaths.office_menu);
  };
  return (
    <MainLayout headerVariant="grey">
      <div className={className}>
        {isDesktop
          && <OfficeNavigation />}
        {
          !isDesktop
          && (
            <Container className="hide-desktop pt-4">
              <Flex gap="16" align="start" as="button" className={styles.menuBtn} onClick={goToMenu}>
                <Svg width={8} height={18} Icon={ChevronLeftIcon} />
                <Typography variant="title-6" color="grey-dark" as="span">{t('to-personal-account')}</Typography>
              </Flex>
              <Typography variant="title-2" centered>
                {pageTitle}
              </Typography>
            </Container>
          )
        }
        {additionalContent}
        <OfficeContainer className={cn(styles.container, classes?.container)}>
          {children}
        </OfficeContainer>
      </div>
    </MainLayout>
  );
};
