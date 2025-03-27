import { MainLayout } from '@/layouts/MainLayout';
import { LookConstructorView } from '@/views/LookConstructorView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LookConstructorPage = () => (
  <MainLayout withFooter={false}>
    <LookConstructorView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
    ])),
  },
}));

export default LookConstructorPage;
