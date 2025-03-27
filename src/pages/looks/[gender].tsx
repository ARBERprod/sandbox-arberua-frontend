import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout } from '@/layouts/MainLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { TotalLookCatalogView } from '@/views/TotalLookCatalogView';
import { getTotalLookCatalog } from '@/entities/TotalLook';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { Meta } from '@/layouts/MainLayout/MainLayout';

interface TotalLookCatalogGenderPageProps {
    meta?: Meta;
}

const TotalLookCatalogGenderPage = ({ meta }: TotalLookCatalogGenderPageProps) => (
  <MainLayout withTopOffset={false} metaData={meta}>
    <TotalLookCatalogView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  store.dispatch(getTotalLookCatalog.initiate({ type: query.gender as string, page: 1 }));

  let meta = null;

  if (query.gender?.includes('man')) {
    meta = {
      title: 'Чоловічий Total Look від ARBER – Купити готові образи для впевненого стилю',
      description: 'Чоловічий Total Look від ARBER – готові стильні образи для чоловіків, що підкреслять ваш стиль та впевненість. Легко обирайте з актуальних колекцій чоловічого одягу та аксесуарів ARBER.',
    };
  } else if (query.gender?.includes('women')) {
    meta = {
      title: 'Жіночий Total Look від ARBER – Купити готові образи для стильного вигляду',
      description: 'Жіночий Total Look від ARBER – стильні готові образи для жінок, створені з урахуванням сучасних трендів. Легко підберіть ідеальний лук з якісного одягу та аксесуарів в інтернет-магазині ARBER.',
    };
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
      meta,
    },
  };
});
export default TotalLookCatalogGenderPage;
