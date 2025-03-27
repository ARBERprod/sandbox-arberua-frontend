import { MainLayout } from '@/layouts/MainLayout';
import { BlogView } from '@/views/BlogView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getPosts } from '@/entities/Blog';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BlogPage = () => (
  <MainLayout>
    <BlogView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, locale }) => {
  store.dispatch(getPosts.initiate({
    page: 1,
    slug: query.slug as string,
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
