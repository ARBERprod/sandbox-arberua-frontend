import { MainLayout } from '@/layouts/MainLayout';
import { ShopsView } from '@/views/ShopsView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getShops } from '@/entities/Shop';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ShopsPage = () => (
  <MainLayout
    metaData={{
      title: 'Магазини, що працюють у вашому місті – Адреси, графік роботи та актуальний асортимент чоловічого і жіночого одягу',
      description: 'Дізнайтеся, які магазини ARBER працюють поруч із вами. Відвідайте офіційні магазини українського бренду в Києві, Луцьку, Одесі, Запоріжжі, Харкові та інших містах.',
    }}
    withFooterBanner={false}
  >
    <ShopsView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  store.dispatch(getShops.initiate({ page: 1 }));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
    },
  };
});

export default ShopsPage;
