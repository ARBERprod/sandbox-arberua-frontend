import { SeoData } from '@/shared/types/common';
import Head from 'next/head';
import { Portal } from '@/shared/ui/Portal';

interface SeoProps {
  seo: SeoData;
  mountMode?: 'body' | 'head' | 'both';
}

export const Seo = ({
  seo = {},
  mountMode = 'head',
}: SeoProps) => {
  if (seo.product?.offers) {
    const updatedOffers = { ...seo.product.offers };

    if (!updatedOffers.priceCurrency) {
      updatedOffers.priceCurrency = 'UAH';
    }

    // eslint-disable-next-line no-param-reassign
    seo = {
      ...seo,
      product: {
        ...seo.product,
        offers: updatedOffers,
      },
    };
  }

  const content = Object.entries(seo)
    .map(([key, value]) => (
      // eslint-disable-next-line react/no-danger
      <script key={key} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }} />
    ));

  if (mountMode === 'head') {
    return (
      <Head>
        {content}
      </Head>
    );
  }
  if (mountMode === 'body') {
    return (
      <Portal mountInBody>
        {content}
      </Portal>
    );
  }

  if (mountMode === 'both') {
    return (
      <>
        <Head>
          {content}
        </Head>
        <Portal mountInBody>
          {content}
        </Portal>
      </>
    );
  }
  return null;
};
