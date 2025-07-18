import { MainLayout } from '@/layouts/MainLayout';
import { BlogView } from '@/views/BlogView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getPosts } from '@/entities/Blog';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BlogPage = () => (
  <MainLayout metaData={{
    title: 'Блог та статті про одяг, стиль та тренди — Інтернет-магазин ARBER',
    description: 'Читайте блог про одяг від ARBER: новини моди, стильні рішення для чоловіків та жінок, та тренди в одязі.',
  }}
  >
    <BlogView />
  </MainLayout>
);

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
