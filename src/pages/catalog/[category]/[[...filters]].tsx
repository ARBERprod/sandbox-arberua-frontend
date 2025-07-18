import { MainLayout } from '@/layouts/MainLayout';
import { CatalogView, getCatalog } from '@/views/CatalogView';
import { wrapper } from '@/shared/config/store/makeStore';
import { getRunningQueriesThunk } from '@/shared/api/rtkApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FilterUtils } from '@/entities/Filter';
import { getPageFromQuery } from '@/widgets/CatalogPagination';
import { routerPaths } from '@/shared/config/router';
import { Meta } from '@/layouts/MainLayout/MainLayout';

interface CatalogPageProps {
  meta?: Meta;
}

const CatalogPage = ({ meta }: CatalogPageProps) => (
  <MainLayout metaData={meta}>
    <CatalogView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { query, locale } = ctx;
  const { isError, data } = await store.dispatch(getCatalog.initiate({
    category: query.category as string,
    filters: FilterUtils.getFilterStringFromQueryArray(query.filters as string[]),
    page: getPageFromQuery(query),
    sort: query.sort as string || null,
  }));

  const { page: pageQuery } = query;

  const page = pageQuery || null;

  if (isError || !data) {
    return {
      redirect: {
        destination: routerPaths.not_found,
        permanent: false,
      },
    };
  }

  let meta = null;

  if (query.category?.includes('new')) {
    meta = {
      title: 'Новинки ARBER - Купити останні надходження чоловічого та жіночого одягу',
      description: 'Відкрийте для себе нові колекції від українського бренду ARBER – стильний чоловічий і жіночий одяг, взуття та аксесуари. Будьте в тренді з новинками сезону!',
      page,
    };
  } else if (query.category?.includes('briuki-1')) {
    meta = {
      title: 'Купити чоловічі штани ARBER — Доставка по Україні',
      description: 'Чоловічі брюки в інтернет-магазині ARBER. Великий вибір, доступні ціни, швидка доставка по Україні.',
      page,
    };
  } else if (query.category === 'sorocki') {
    meta = {
      title: 'Чоловічі сорочки ARBER | Офіційний сайт ARBER.UA',
      description: 'Купити чоловічі сорочки на сайті ARBER: моделі з довгим і коротким рукавом від українського бренду. Стильні сорочки ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('verxnii-odiag-1')) {
    meta = {
      title: 'Чоловічий верхній одяг ARBER | Офіційний сайт ARBER.UA',
      description: 'Купити чоловічий верхній одяг на офіційному сайті ARBER: куртки, плащі, пальта від українського бренду. Стильний верхній одяг ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('dzinsi-ta-cinosi')) {
    meta = {
      title: 'Чоловічі джинси ARBER | Офіційний сайт ARBER.UA',
      description: 'Купити чоловічі джинси на офіційному сайті ARBER: класичні та вільні моделі від українського бренду. Джинси ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('kostiumi')) {
    meta = {
      title: 'Чоловічі костюми ARBER |Офіційний сайт ARBER.UA',
      description: 'Купити чоловічий костюм ARBER на офіційному сайті: класичні костюми для чоловіків від українського бренду. Стильні костюми ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('pidzaki')) {
    meta = {
      title: 'Чоловічі піджаки ARBER | Стильний одяг для ділових чоловіків | ARBER.UA',
      description: 'Купити чоловічий піджак на офіційному сайті ARBER: стильні піджаки для ділових чоловіків від українського бренду. Піджаки ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('svetri-ta-dzemperi-1')) {
    meta = {
      title: 'Чоловічий светр ARBER | Кофти та джемпери від ARBER',
      description: 'Купити чоловічий светр ARBER на офіційному сайті: кофти, джемпери, гольфи від українського бренду ARBER. Стильні светри ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('sportivnii-odiag-1')) {
    meta = {
      title: 'Чоловічий спортивний одяг ARBER | Купити штани, джемпери, футболки',
      description: 'Чоловічий спортивний одяг ARBER на офіційному сайті: штани, джемпери, футболки від українського бренду ARBER. Спортивний одяг та інший чоловічий одяг ARBER за найкращими цінами.',
      page,
    };
  } else if (query.category === 'polo-ta-futbolki') {
    meta = {
      title: 'Чоловіча футболка поло ARBER | Стильні футболки поло',
      description: 'Купити чоловічу футболку поло на офіційному сайті ARBER: стильні футболки поло від українського бренду ARBER. Футболки поло ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('sorti-1')) {
    meta = {
      title: 'Чоловічі шорти ARBER | Класичні, спортивні та джинсові шорти',
      description: 'Купити чоловічі шорти ARBER на офіційному сайті: класичні, спортивні, джинсові шорти від українського бренду ARBER. Шорти ARBER та інший чоловічий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('krosivki-ta-kedi-1')) {
    meta = {
      title: 'Чоловічі кросівки ARBER | Шкіряні кросівки від ARBER',
      description: 'Купити чоловічі кросівки ARBER на офіційному сайті: шкіряні кросівки від українського бренду ARBER. Кросівки ARBER та інше чоловіче взуття за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('tufli-1')) {
    meta = {
      title: 'Чоловічі туфлі ARBER | Оксфорди, лофери та броги | ARBER.UA',
      description: 'Купити чоловічі туфлі ARBER на офіційному сайті: оксфорди, лофери та броги від українського бренду ARBER. Туфлі ARBER та інше чоловіче взуття за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('remeni-1')) {
    meta = {
      title: 'Чоловічі ремені ARBER | Стильні ремені та аксесуари для чоловіків',
      description: 'Купити чоловічі ремені ARBER на офіційному сайті: стильні ремені для штанів від українського бренду ARBER. Ремені ARBER та інші чоловічі аксесуари за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('kravatki-na-meteliki')) {
    meta = {
      title: 'Чоловічі краватки та метелики ARBER | Стильні аксесуари для чоловіків',
      description: 'Купити стильні краватки та метелики ARBER на офіційному сайті: класичні краватки та метелики від українського бренду ARBER. Краватки ARBER та інші чоловічі аксесуари за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('zaponki')) {
    meta = {
      title: 'Запонки ARBER | Стильні запонки для чоловіків | ARBER.UA',
      description: 'Купити запонки Arber на офіційному сайті ☑\uFE0FЧоловічі запонки від українського бренду Арбер ☑\uFE0FСтильні запонки Arber та інші чоловічі аксесуари за найкращою ціною',
      page,
    };
  } else if (query.category?.includes('podarunkovii-nabir')) {
    meta = {
      title: 'Чоловічі подарункові набори ARBER | Стильні аксесуари для чоловіків',
      description: 'Купити найкращі подарункові набори для чоловіків від українського бренду ARBER. Стильні аксесуари в подарункових наборах для чоловіків ARBER за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('golovni-ubori')) {
    meta = {
      title: 'Чоловічі головні убори ARBER | Шапки, кепки та шарфи | ARBER.UA',
      description: 'Купити головний убір для чоловіка ARBER на офіційному сайті: шапки, кепки та шарфи від українського бренду ARBER. Головні убори ARBER та інші чоловічі аксесуари за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('sarfi-1')) {
    meta = {
      title: 'Чоловічі шарфи ARBER | Стильні шарфи для чоловіків | ARBER.UA',
      description: 'Купити чоловічі шарфи ARBER на офіційному сайті: стильні шарфи від українського бренду ARBER. Шарфи ARBER та інші чоловічі аксесуари за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('skarpetki')) {
    meta = {
      title: 'Чоловічі шкарпетки ARBER | Стильні шкарпетки для чоловіків | ARBER.UA',
      description: 'Купити чоловічі шкарпетки ARBER на офіційному сайті: класичні шкарпетки від українського бренду ARBER. Шкарпетки ARBER та інші чоловічі аксесуари за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('Outlet-1')) {
    meta = {
      title: 'Outlet одяг для чоловіків — Знижки на одяг від ARBER',
      description: 'Знижки та спеціальні пропозиції на одяг, взуття та аксесуари для чоловіків від бренду ARBER.',
      page,
    };
  } else if (query.category?.includes('Outlet')) {
    meta = {
      title: 'Outlet одяг для жінок — Знижки на одяг від ARBER',
      description: 'Знижки та спеціальні пропозиції на одяг, взуття та аксесуари для жінок від бренду ARBER.',
      page,
    };
  } else if (query.category?.includes('popular-man')) {
    meta = {
      title: 'Популярні речі для чоловіків | Стильний одяг та аксесуари | ARBER.UA',
      description: 'Купити популярні речі для чоловіків на офіційному сайті ARBER. Стильний одяг, аксесуари та найкращі пропозиції для сучасних чоловіків від українського бренду ARBER.',
      page,
    };
  } else if (query.category?.includes('popular-women')) {
    meta = {
      title: 'Популярні речі для жінок | Стильний одяг та аксесуари | ARBER.UA',
      description: 'Купити популярні речі для жінок на офіційному сайті ARBER. Стильний одяг, аксесуари та найкращі пропозиції для сучасних чоловіків від українського бренду ARBER.',
      page,
    };
  } else if (query.category?.includes('novelty-women')) {
    meta = {
      title: 'Новинки для жінок | Оновлення колекції від ARBER | ARBER.UA',
      description: 'Купити новинки жіночого одягу на офіційному сайті ARBER. Оновлені колекції стильного одягу та аксесуарів для жінок від українського бренду ARBER.',
      page,
    };
  } else if (query.category?.includes('briuki')) {
    meta = {
      title: 'Жіночі брюки ARBER | Стильні брюки для жінок | ARBER.UA',
      description: 'Купити жіночі брюки ARBER на офіційному сайті. Ділові та повсякденні брюки для жінок від українського бренду ARBER. Стильні штани та інший жіночий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('bluzi-ta-sorocki')) {
    meta = {
      title: 'Жіночі блузки ARBER | Стильні блузки для жінок | ARBER.UA',
      description: 'Купити жіночу блузку ARBER на офіційному сайті. Блузки від українського бренду ARBER для стильних жінок. Стильні блузки та інший жіночий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('verxnii-odiag')) {
    meta = {
      title: 'Жіночий верхній одяг ARBER | Куртки, пальта та жилети для жінок | ARBER.UA',
      description: 'Купити жіночий верхній одяг ARBER на офіційному сайті. Зимові куртки, пальта та жилети від українського бренду ARBER. Стильний верхній одяг ARBER та інший жіночий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('dzinsi')) {
    meta = {
      title: 'Жіночі джинси ARBER | Стильні джинси для жінок | ARBER.UA',
      description: 'Купити жіночі джинси ARBER на офіційному сайті arber.ua. Джинси для жінок від українського бренду ARBER. Стильні джинси та інший жіночий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('futbolki-ta-topi')) {
    meta = {
      title: 'Жіноча футболка Arber | Футболки поло та прямого крою від ARBER | ARBER.UA',
      description: 'Купити жіночу футболку ARBER на офіційному сайті arber.ua. Футболки поло та прямого крою від українського бренду ARBER. Стильні футболки та інший жіночий одяг за найкращими цінами.',
      page,
    };
  } else if (query.category?.includes('suknia')) {
    meta = {
      title: 'Сукня жіноча Arber | Повсякденні та офісні сукні від ARBER | ARBER.UA',
      description: 'Купуйте стильні сукні для будь-якої нагоди на офіційному сайті ARBER. Повсякденні та офісні моделі від українського бренду за вигідними цінами.',
      page,
    };
  } else if (query.category?.includes('tufli')) {
    meta = {
      title: 'Жіночі туфлі | Купити шкіряні туфлі для жінок в ARBER',
      description: 'Купуйте стильні жіночі туфлі в ARBER Megastore. Шкіряні моделі для будь-якої події, зручні та елегантні.',
      page,
    };
  } else if (query.category?.includes('bosonizki-ta-sandali')) {
    meta = {
      title: 'Босоніжки жіночі Arber | Стильні босоніжки для жінок на Arber.ua',
      description: 'Купити жіночі босоніжки Arber на офіційному сайті. Стильні та зручні моделі від українського бренду Арбер за найкращою ціною.',
      page,
    };
  } else if (query.category?.includes('sal')) {
    meta = {
      title: 'Весняний розпродаж від Arber — Знижки на одяг',
      description: 'Купуйте чоловічий та жіночий одяг, та взуття від ARBER вигідно з акцією Весняний розпродаж',
      page,
    };
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common', 'sizes',
      ])),
      meta,
    },
  };
});

export default CatalogPage;
