import { MainLayout } from '@/layouts/MainLayout';
import { PromotionsView } from '@/views/PromotionsView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { getPromotions } from '@/entities/Promotion';
import { useTranslation } from 'react-i18next';

const PromotionsPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout metaData={{
      title: t('promotions.title'),
      description: t('promotions.description'),
    }}
    >
      <PromotionsView />
    </MainLayout>
  );
};

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
