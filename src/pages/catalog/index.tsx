import { Redirect } from '@/shared/lib/components/Redirect';
import { routerPaths } from '@/shared/config/router';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CatalogPage = () => <Redirect path={`${routerPaths.catalog}/colovikam`} />;

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
    ])),
  },
}));

export default CatalogPage;
