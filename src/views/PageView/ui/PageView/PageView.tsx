import { memo } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Container } from '@/shared/ui/Container';
import { FlexCol } from '@/shared/ui/Flex';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Typography } from '@/shared/ui/Typography';
import styles from './PageView.module.scss';
import { useGetCustomPageDataQuery } from '../../api/customPageApi';

interface PageViewProps {
  className?: string;
}

export const PageView = memo(({ className }:PageViewProps) => {
  const { query } = useRouter();
  const {
    data, isLoading, isError, error,
  } = useGetCustomPageDataQuery({ page: query.page as string });

  if (isLoading) return <Loader centered />;
  if (isError || !data) return <ErrorMessage error={JSON.stringify(error, null, 2)} />;
  const { page, breadcrumbs } = data;
  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <FlexCol align="center">
          <PageBreadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumbs} />
          <Typography variant="title-1">{page.title}</Typography>
        </FlexCol>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: page.description }} />
      </Container>
    </div>
  );
});
