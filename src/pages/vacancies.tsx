import { MainLayout } from '@/layouts/MainLayout';
import { getVacancyData, VacancyView } from '@/views/VacancyView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const VacancyPage = () => (
  <MainLayout>
    <VacancyView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getVacancyData.initiate({}));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'vacancy-page',
      ])),
    },
  };
});

export default VacancyPage;
