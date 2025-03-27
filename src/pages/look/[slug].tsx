import { MainLayout } from '@/layouts/MainLayout';
import { TotalLookView } from '@/views/TotalLookView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getTotalLook } from '@/entities/TotalLook';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';

const TotalLookPage = () => (
  <MainLayout>
    <TotalLookView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  store.dispatch(getTotalLook.initiate({ slug: query.slug as string }));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'sizes',
      ])),
    },
  };
});

export default TotalLookPage;
