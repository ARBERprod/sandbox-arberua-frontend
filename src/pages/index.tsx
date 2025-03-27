import { getHomePageBanners, getHomePageBaseData, MainView } from '@/views/MainView';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (

    <MainLayout
      withTopOffset={false}
      isIndexPage
    >
      <MainView />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getHomePageBanners.initiate());
  store.dispatch(getHomePageBaseData.initiate());

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'main-page',
      ])),
    },
  };
});
