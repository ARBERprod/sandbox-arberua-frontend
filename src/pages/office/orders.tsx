import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeLayout } from '@/layouts/OfficeLayout';
import { OfficeOrdersView } from '@/views/OfficeOrdersView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OfficeOrdersPage = () => (
  <AuthChecker privateRoute>
    <OfficeLayout>
      <OfficeOrdersView />
    </OfficeLayout>
  </AuthChecker>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'office-page',
      'checkout-page',
    ])),
  },
}));

export default OfficeOrdersPage;
