import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { SellerView } from '@/views/SellerView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DetailedStaff, getStaff } from '@/entities/Staff';
import { routerPaths } from '@/shared/config/router';

interface SellerPageProps {
  seller: DetailedStaff;
}

export default function SellerPage({ seller }: SellerPageProps) {
  return (
    <MainLayout>
      <SellerView seller={seller} />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps<SellerPageProps>((store) => async ({
  locale,
  query,
}) => {
  const { data } = await store.dispatch(getStaff.initiate({ slug: query.slug as string }));
  if (!data) {
    return {
      redirect: {
        destination: routerPaths.not_found,
        permanent: false,
      },
    };
  }

  return {
    props: {
      seller: data,
      ...(await serverSideTranslations(locale as string, [
        'common',
        'checkout-page',
        'consultations',
      ])),
    },
  };
});
