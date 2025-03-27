import { MainLayout } from '@/layouts/MainLayout';
import { CheckoutView } from '@/views/CheckoutView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CheckoutPage = () => (
  <MainLayout>
    <CheckoutView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {

    ...(await serverSideTranslations(locale as string, [
      'common',
      'checkout-page',
      'office-page',
    ])),
  },
}));

export default CheckoutPage;
