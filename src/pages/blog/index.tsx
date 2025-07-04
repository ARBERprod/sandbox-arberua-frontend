import { MainLayout } from '@/layouts/MainLayout';
import { BlogView } from '@/views/BlogView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getPosts } from '@/entities/Blog';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { AboutView } from '@/views/AboutView';

const BlogPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout metaData={{
      title: t('blog.title'),
      description: t('blog.description'),
    }}
    >
      <BlogView />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getPosts.initiate({
    page: 1,
  }));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});

export default BlogPage;
