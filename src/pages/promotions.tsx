import { MainLayout } from '@/layouts/MainLayout';
import { PromotionsView } from '@/views/PromotionsView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { getPromotions } from '@/entities/Promotion';

const PromotionsPage = () => (
  <MainLayout metaData={{
    title: 'Акції та знижки на одяг — Інтернет-магазин ARBER',
    description: 'Акції та знижки на чоловічий і жіночий одяг, взуття та аксесуари від українського бренду ARBER.',
  }}
  >
    <PromotionsView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getPromotions.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});

export default PromotionsPage;
