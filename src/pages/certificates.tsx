import { MainLayout } from '@/layouts/MainLayout';
import { CertificatesView } from '@/views/CertificatesView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { getCertificates } from '@/entities/Certificate';

const CertificatesPage = () => (
  <MainLayout
    metaData={{
      title: 'Подарунковий сертифікат – Ідеальний стильний подарунок',
      description: 'Сертифікат ARBER – чудовий вибір для стильного подарунка. Придбати його можна онлайн або у магазинах ARBER з можливістю використання як на сайті, так і в будь-якому магазині бренду.',
    }}
    withFooter
  >
    <CertificatesView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getCertificates.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'certificates',
      ])),
    },
  };
});

export default CertificatesPage;
