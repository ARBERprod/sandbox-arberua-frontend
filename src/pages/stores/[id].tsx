import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout } from '@/layouts/MainLayout';
import { ShopView } from '@/views/ShopView';
import { wrapper } from '@/shared/config/store/makeStore';
import { DetailedShop, getShop } from '@/entities/Shop';
import { routerPaths } from '@/shared/config/router';
import { getHomePageBaseData } from '@/views/MainView';
import { SliderData } from '@/views/MainView/api/types';

interface ShopPageProps {
  shop: DetailedShop;
  popular: SliderData[];
}

const ShopPage = ({ shop, popular }: ShopPageProps) => (
  <MainLayout
    metaData={{
      title: 'Магазини, що працюють у вашому місті – Адреси, графік роботи та актуальний асортимент чоловічого і жіночого одягу',
      description: 'Дізнайтеся, які магазини ARBER працюють поруч із вами. Відвідайте офіційні магазини українського бренду в Києві, Луцьку, Одесі, Запоріжжі, Харкові та інших містах.',
    }}
    withFooterBanner={false}
  >
    <ShopView shop={shop} popular={popular} />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps<ShopPageProps>((store) => async ({
  query,
  locale,
}) => {
  const [shopResult, baseDataResult] = await Promise.all([
    store.dispatch(getShop.initiate({ shopId: query.id as string })),
    store.dispatch(getHomePageBaseData.initiate()),
  ]);

  if (!shopResult.data) {
    return {
      redirect: {
        destination: routerPaths.not_found,
        permanent: false,
      },
    };
  }

  return {
    props: {
      shop: shopResult.data,
      popular: baseDataResult.data?.sectionPopular || [],
      ...(await serverSideTranslations(locale as string, [
        'common',
        'consultations',
        'main-page',
      ])),
    },
  };
});

export default ShopPage;
