import { MainLayout } from '@/layouts/MainLayout';
import { ChosenLookView } from '@/views/ChosenLookView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ChosenLook = () => (
  <MainLayout withFooter={false}>
    <ChosenLookView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
    ])),
  },
}));

export default ChosenLook;
