import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import cn from 'classnames';
import { routerPaths } from '@/shared/config/router';
import styles from './MainLayout.module.scss';
import { useTranslation } from 'react-i18next';

export interface Meta {
    title: string;
    description: string;
    page?: string;
}

export interface DynamicMeta {
    textBeforeTitle?: string;
    title: string;
    textAfterTitle?: string;
    textBeforeDescription?: string;
    description: string;
    descriptionUsesTitle?: string;
    textAfterDescription?: string;
    textEndDescription?: string;
    page?: string;
}

interface MainLayoutProps {
    className?: string;
    title?: string;
    children: ReactNode;
    withFooter?: boolean;
    withTopOffset?: boolean;
    withFooterBanner?: boolean;
    headerVariant?: 'transparent' | 'grey';
    metaData?: Meta;
    dynamicMeta?: DynamicMeta;
    isIndexPage?: boolean;
}

export const MainLayout = ({
  className,
  withFooter = true,
  withTopOffset = true,
  withFooterBanner = true,
  headerVariant = 'transparent',
  title,
  children,
  metaData,
  dynamicMeta,
  isIndexPage,
}: MainLayoutProps) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  const getMetaTitle = () => {
    if (dynamicMeta?.title) {
      return `${dynamicMeta.title}  ${dynamicMeta.textAfterTitle ? `| ${dynamicMeta.textAfterTitle}` : ''} ${dynamicMeta.page ? ` - ${t('page')} ${dynamicMeta.page}` : ''}`;
    }

    const baseTitle = metaData?.title ? t(metaData.title as any) : title;
    const pageNumber = metaData?.page ? ` - ${t('page')} ${metaData.page}` : '';

    return baseTitle ? `${baseTitle}${pageNumber}` : 'Інтернет-магазин українського бренду ARBER - Купити Чоловічий та Жіночий одяг, взуття, аксесуари';
  };
  const metaTitle = getMetaTitle();

  return (
    <>
      <Head>
        <title>
          {metaTitle}
        </title>
        <meta
          name="description"
          content={(dynamicMeta?.description && `${dynamicMeta.textBeforeDescription ? `${dynamicMeta.textBeforeDescription}` : ''} ${dynamicMeta.description} ${dynamicMeta.textAfterDescription ? `${dynamicMeta.textAfterDescription}` : ''} ${dynamicMeta.descriptionUsesTitle ? dynamicMeta.descriptionUsesTitle : ''} ${dynamicMeta.textEndDescription ? `${dynamicMeta.textEndDescription}` : ''}`)
                        || (metaData?.description && t(metaData.description as any))
                        || 'Офіційний сайт українського бренду ARBER – стильний чоловічий і жіночий одяг, взуття та аксесуари. Сезонні знижки, вигідні акції та великий асортимент для створення вашого ідеального образу.'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {isIndexPage
                    && <meta name="google-site-verification" content="RjQxNch6HvlWEV_1q-G6ezH6LMMKwLbY0zrQZiOHB8E" />}
      </Head>
      <Header headerVariant={headerVariant} />
      <main
        className={cn(className, styles.main, {
          [styles.with_top_offset]: withTopOffset,
          [styles.notHomePage]: pathname !== routerPaths.main,
        })}
      >

        {children}
      </main>
      {withFooter
                && <Footer withBanner={withFooterBanner} />}
    </>
  );
};
