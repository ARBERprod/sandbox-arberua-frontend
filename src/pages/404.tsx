import { MainLayout } from '@/layouts/MainLayout';
import { NotFoundView } from '@/views/NotFoundView';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'uk', ['common'])),
  },
});

const NotFoundPage = () => (
  <MainLayout withFooter={false}>
    <NotFoundView />
  </MainLayout>
);

export default NotFoundPage;
