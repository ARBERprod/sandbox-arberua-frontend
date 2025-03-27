import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeFeedbackView } from '@/views/OfficeFeedbackView';
import { OfficeLayout } from '@/layouts/OfficeLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OfficeFeedbackPage = () => (
  <AuthChecker privateRoute>
    <OfficeLayout>
      <OfficeFeedbackView />
    </OfficeLayout>
  </AuthChecker>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'office-page',
      'contacts-page',
    ])),
  },
}));

export default OfficeFeedbackPage;
