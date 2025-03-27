import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeConsultationsView } from '@/views/OfficeConsultationsView';
import { OfficeLayout } from '@/layouts/OfficeLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OfficeConsultationsPage = () => (
  <AuthChecker privateRoute>
    <OfficeLayout>
      <OfficeConsultationsView />
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

export default OfficeConsultationsPage;
