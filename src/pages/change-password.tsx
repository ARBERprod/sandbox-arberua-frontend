import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ChangePasswordView } from '@/views/ChangePasswordView';
import { wrapper } from '@/shared/config/store/makeStore';
import { routerPaths } from '@/shared/config/router';
import { MainLayout } from '@/layouts/MainLayout';

const ChangePasswordPage = () => (
  <MainLayout withFooter={false}>
    <ChangePasswordView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(
  () => async ({ locale, query }) => {
    const { token, email } = query;
    if (!token || !email) {
      return {
        redirect: {
          permanent: true,
          destination: routerPaths.main,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  },
);
export default ChangePasswordPage;
