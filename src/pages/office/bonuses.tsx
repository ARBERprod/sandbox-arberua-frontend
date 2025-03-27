import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeLayout } from '@/layouts/OfficeLayout';
import { BalanceInfo, OfficeBonusesView } from '@/views/OfficeBonusesView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OfficeBonusesPage = () => (
  <AuthChecker privateRoute>
    <OfficeLayout additionalContent={<BalanceInfo />}>
      <OfficeBonusesView />
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

export default OfficeBonusesPage;
