import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout, DynamicMeta } from '@/layouts/MainLayout/MainLayout';
import { ProductView } from '@/views/ProductView';
import { wrapper } from '@/shared/config/store/makeStore';
import { DetailedProduct, getProduct, Product } from '@/entities/Product';
import { routerPaths } from '@/shared/config/router';
import { SeoData } from '@/shared/types/common';
import { Seo } from '@/shared/lib/components/Seo';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { getPageRedirect } from '@/entities/Redirects';

interface ProductPageProps {
    product: DetailedProduct;
    breadcrumbs: Breadcrumb[];
    recommendations: Product[];
    seo: SeoData;
    dynamicMeta: DynamicMeta;
}

export default function ProductPage({
  product,
  breadcrumbs,
  recommendations,
  seo,
  dynamicMeta,
}: ProductPageProps) {
  return (
    <MainLayout dynamicMeta={dynamicMeta}>
      <ProductView
        product={product}
        recommendations={recommendations}
        breadcrumbs={breadcrumbs}
      />
      <Seo seo={seo} />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps<ProductPageProps>((store) => async ({
  query,
  locale,
}) => {
  const {
    isError,
    data,
  } = await store.dispatch(getProduct.initiate({ slug: query.slug as string }));

  if (isError || !data) {
    const { data: redirectData } = await store.dispatch(getPageRedirect.initiate({ slug: query.slug as string }));
    const redirectUrl = redirectData?.data?.[0]?.destination ?? null;

    if (redirectUrl) {
      return {
        redirect: {
          destination: redirectUrl,
          permanent: true,
        },
      };
    }

    return {
      redirect: {
        destination: routerPaths.not_found,
        permanent: false,
      },
    };
  }

  const {
    title,
    description,
  } = data.product;

  const dynamicMeta = {
    textAfterTitle: 'Купити онлайн',
    title: title ? `${title}` : '',
    description: description || '',
    descriptionUsesTitle: title ? `${title}` : '',
    textBeforeDescription: 'Купіть',
    textAfterDescription: 'ARBER. Швидка доставка по Україні. Замовити',
    textEndDescription: 'ARBER за вигідною ціною зараз!',
  };

  return {
    props: {
      product: data.product,
      breadcrumbs: data.breadcrumbs || [],
      recommendations: data.similar || [],
      seo: data.markup,
      dynamicMeta,
      ...(await serverSideTranslations(locale as string, [
        'common',
        'product-card',
        'sizes',
      ])),
    },
  };
});
