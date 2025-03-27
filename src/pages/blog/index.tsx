import { MainLayout } from '@/layouts/MainLayout';
import { BlogView } from '@/views/BlogView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getPosts } from '@/entities/Blog';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BlogPage = () => (
  <MainLayout metaData={{
    title: 'Блог інтернет-магазину ARBER – Мода, стиль, новини та тренди',
    description: 'Читайте блог українського бренду ARBER: новини моди, стильні рішення для чоловіків та жінок, корисні поради, знижки, акції та тренди сезону. Будьте в курсі всіх подій та оновлень від ARBER.',
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
