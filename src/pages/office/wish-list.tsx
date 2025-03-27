import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeLayout } from '@/layouts/OfficeLayout';
import { OfficeWishListView } from '@/views/OfficeWishListView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OfficeWishListPage = () => (
  <AuthChecker privateRoute>
    <OfficeLayout>
      <OfficeWishListView />
    </OfficeLayout>
  </AuthChecker>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'office-page',
    ])),
  },
}));

export default OfficeWishListPage;
