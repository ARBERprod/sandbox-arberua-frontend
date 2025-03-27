import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout } from '@/layouts/MainLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { TotalLookCatalogView } from '@/views/TotalLookCatalogView';
import { getTotalLookCatalog } from '@/entities/TotalLook';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';

const TotalLookCatalogPage = () => (
  <MainLayout
    withTopOffset={false}
    metaData={{
      title: 'Total Look від ARBER – Купити готові стильні образи',
      description: 'Офіційний сайт ARBER – обирайте Total Look для будь-якої нагоди! Готові стильні образи з різних елементів одягу, що допоможуть виглядати бездоганно. Знижки та акції в інтернет-магазині ARBER.',
    }}
  >
    <TotalLookCatalogView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getTotalLookCatalog.initiate({ page: 1 }));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});

export default TotalLookCatalogPage;
