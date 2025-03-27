import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeLayout } from '@/layouts/OfficeLayout';
import { OfficeReviewsView } from '@/views/OfficeReviewsView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OfficeReviewsPage = () => (
  <AuthChecker privateRoute>
    <OfficeLayout>
      <OfficeReviewsView />
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

export default OfficeReviewsPage;
