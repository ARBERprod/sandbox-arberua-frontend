import { MainLayout } from '@/layouts/MainLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { ArticleTemplate } from '@/shared/templates/ArticleTemplate';

const FaqPage = () => (
  <MainLayout withFooter>
    <ArticleTemplate />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});

export default FaqPage;
