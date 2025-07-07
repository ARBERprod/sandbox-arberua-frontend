import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ArticlePost } from '@/entities/Blog';
import { Container } from '@/shared/ui/Container';
import { Breadcrumb, PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import styles from './ArticlePostView.module.scss';
import { Product } from '@/entities/Product';
import { RecommendedProducts } from '@/widgets/ProductPresenter';
import Head from 'next/head';

interface ArticlePostViewProps {
  className?: string;
  article: ArticlePost;
  recommended: Product[];
  breadcrumbs: Breadcrumb[];
  next: string | null;
  previous: string | null;
}

export const ArticlePostView = memo(({
  article,
  className,
  next,
  recommended = [],
  previous,
  breadcrumbs,
}: ArticlePostViewProps) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  return (
    <div className={cn(styles.root, className)}>
      <Head>
        <title>
          {article.title}
          {' '}
          —
          {' '}
          {t('blog-article-end.title')}
        </title>
      </Head>
      <Container className={styles.container}>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumps} />
        <Typography variant="title-1" className={styles.title} centered>{article.title}</Typography>
        <Typography variant="body-2" centered>{article.created_at}</Typography>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.description }} />
        <RecommendedProducts title={t('same_products')} products={recommended} className={styles.slider} />
        <Flex justify="between" align="center">
          {previous
            && <Button color="light-secondary" onClick={() => push(previous)}>{t('prev_article')}</Button>}
          {next
            && <Button color="light-secondary" onClick={() => push(next)}>{t('next_article')}</Button>}
        </Flex>
      </Container>
    </div>
  );
});
