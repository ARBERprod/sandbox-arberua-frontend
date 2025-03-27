import { OfficeView } from '@/views/OfficeView';
import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeLayout } from '@/layouts/OfficeLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OfficePage = () => (
  <AuthChecker privateRoute>
    <OfficeLayout>
      <OfficeView />
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

export default OfficePage;
