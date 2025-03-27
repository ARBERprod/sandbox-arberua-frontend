import { MainLayout } from '@/layouts/MainLayout';
import { FaqView } from '@/views/FaqView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getFaqs } from '@/views/FaqView/api/faqApi';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';

const FaqPage = () => (
  <MainLayout
    withFooter
    metaData={{
      title: 'Питання та відповіді | ARBER – Довідковий розділ',
      description: 'Найпоширеніші питання про продукцію та послуги ARBER. Знайдіть відповіді на питання про замовлення, доставку, оплату та програму лояльності. Все, що вам потрібно знати для зручного шопінгу з ARBER.',
    }}
  >
    <FaqView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getFaqs.initiate());

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'collections',
        'contacts-page',
        'faq',
      ])),
    },
  };
});

export default FaqPage;
