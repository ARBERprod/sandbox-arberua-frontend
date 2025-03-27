import React, { memo } from 'react';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import { Redirect } from '@/shared/lib/components/Redirect';
import { routerPaths } from '@/shared/config/router';
import { Container } from '@/shared/ui/Container';
import { FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { OfficeMenu } from '@/widgets/OfficeNavigation';
import { useTranslation } from 'next-i18next';

export const OfficeMenuView = memo(() => {
  const isDesktop = useMediaQuery(breakpoints.desktop);
  const { t } = useTranslation();
  if (isDesktop) return <Redirect path={routerPaths.office} />;

  return (
    <Container className="pb-15 pt-7">
      <FlexCol className="w-full" gap="20">
        <Typography centered variant="title-2">{t('office.cabinet')}</Typography>
        <OfficeMenu />
      </FlexCol>
    </Container>
  );
});
