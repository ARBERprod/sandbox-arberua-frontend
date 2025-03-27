import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CheckoutSuccessView } from '@/views/CheckoutSuccesView';
import { MainLayout } from '@/layouts/MainLayout';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { wrapper } from '@/shared/config/store/makeStore';
import { routerPaths } from '@/shared/config/router';
import { getSuccessOrderInfo, OrderDto } from '@/entities/Order';

interface CheckoutSuccessPageProps {
  order: OrderDto;
}

const CheckoutSuccessPage = ({ order }: CheckoutSuccessPageProps) => (
  <MainLayout>
    <CheckoutSuccessView order={order} />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps<CheckoutSuccessPageProps>(
  (store) => async (ctx) => {
    const id = ctx.query.order_id;

    if (!id) {
      return {
        redirect: {
          destination: routerPaths.main,
          permanent: false,
        },
      };
    }
    const { data, isError } = await store.dispatch(
      getSuccessOrderInfo.initiate({
        orderId: id as string,
      }),
    );

    if (isError || !data) {
      return {
        redirect: {
          destination: routerPaths.main,
          permanent: false,
        },
      };
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        order: data,
        ...(await serverSideTranslations(ctx.locale as string, ['common'])),
      },
    };
  },
);

export default CheckoutSuccessPage;
