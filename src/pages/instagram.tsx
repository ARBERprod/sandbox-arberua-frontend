import { MainLayout } from '@/layouts/MainLayout';
import { InstagramView } from '@/views/InstagramView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getInstagrams } from '@/entities/InstagramFeedback';
import { routerPaths } from '@/shared/config/router';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';

const InstagramPage = () => (
  <MainLayout>
    <InstagramView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async ({
  locale,
  query,
}) => {
  const {
    data,
    isError,
  } = await dispatch(getInstagrams.initiate({ page: Number(query.page as string) || 1 }));

  if (isError || !data) {
    return {
      redirect: {
        permanent: false,
        destination: routerPaths.not_found,
      },
    };
  }

  await Promise.all(dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});
export default InstagramPage;
