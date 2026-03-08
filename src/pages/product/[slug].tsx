import { useMemo } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
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
}

export default function ProductPage({
  product,
  breadcrumbs,
  recommendations,
  seo,
}: ProductPageProps) {
  const { t } = useTranslation('product-card');

  const dynamicMeta: DynamicMeta = useMemo(() => ({
    textAfterTitle: t('seo.title_suffix'),
    title: product.title || '',
    description: product.description || '',
    descriptionUsesTitle: product.title || '',
    textBeforeDescription: t('seo.description_prefix'),
    textAfterDescription: t('seo.description_suffix'),
    textEndDescription: t('seo.description_end'),
  }), [product.title, product.description, t]);

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

  return {
    props: {
      product: data.product,
      breadcrumbs: data.breadcrumbs || [],
      recommendations: data.recommended || [],
      seo: data.markup,
      ...(await serverSideTranslations(locale as string, [
        'common',
        'product-card',
        'sizes',
      ])),
    },
  };
});
