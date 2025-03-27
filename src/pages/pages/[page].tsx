import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout } from '@/layouts/MainLayout';
import { wrapper } from '@/shared/config/store/makeStore';
import { getCustomPageData, PageView } from '@/views/PageView';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { routerPaths } from '@/shared/config/router';

const PagePage = ({ meta }: { meta?: {title: string, description: string} }) => (
  <MainLayout metaData={meta} withFooter>
    <PageView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  const { page } = query;
  const { data, isError } = await store.dispatch(getCustomPageData.initiate({ page: page as string }));

  if (isError || !data) {
    return {
      redirect: {
        destination: routerPaths.not_found,
        permanent: false,
      },
    };
  }
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  let meta = null;
  if (query.page === 'oplata-i-dostavka') {
    meta = { title: 'Оплата і доставка – Умови та способи', description: 'Дізнайтесь всі способи оплати та доставки в інтернет-магазині ARBER. Прийом замовлень за телефоном 0 800 333 083 (безкоштовно по Україні) або через кошик на сайті. Корпоративні замовлення з оплатою безготівковим розрахунком можна оформити через ecommerce@arber.ua.' };
  } else if (query.page === 'obmen-i-povernenia') {
    meta = { title: 'Обмін і повернення товару – Простий та зручний процес', description: 'Дізнайтеся про умови обміну та повернення товарів ARBER при покупці через інтернет-магазин. Ми прагнемо зробити ваш шопінг легким і приємним – завжди можливість обміну або повернення, якщо товар не підійшов за розміром, кольором чи фасоном.' };
  } else if (query.page === 'terms-of-use') {
    meta = { title: 'Користувацька угода – Публічний договір оферта', description: 'Офіційний публічний договір оферти на купівлю-продаж і доставку товарів на сайті arber.ua. Ця угода є публічною пропозицією, що відповідає статті 633 Цивільного кодексу України, і регулює умови замовлення та покупки товарів ARBER.' };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
      ])),
      meta,
    },
  };
});

export default PagePage;
