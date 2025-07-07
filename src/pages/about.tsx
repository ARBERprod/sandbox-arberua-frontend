import { MainLayout } from '@/layouts/MainLayout';
import { AboutView } from '@/views/AboutView';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { PromotionsView } from '@/views/PromotionsView';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout
      metaData={{
        title: t('about.title'),
        description: t('about.description'),
      }}
      withFooter
    >
      <AboutView />
    </MainLayout>
  );
};

export const getStaticProps:GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'main-page',
      'about-page',
    ])),
  },
});

export default AboutPage;
