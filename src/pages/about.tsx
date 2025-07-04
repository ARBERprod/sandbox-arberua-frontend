import { MainLayout } from '@/layouts/MainLayout';
import { AboutView } from '@/views/AboutView';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AboutPage = () => (
  <MainLayout
    metaData={{
      title: 'Історія ARBER — Про український бренд одягу для чоловіків та жінок',
      description: 'Дізнайтеся більше про бренд ARBER – український виробник чоловічого та жіночого одягу. Історія, місія та цінності бренду, що поєднує якість та актуальний дизайн.',
    }}
    withFooter
  >
    <AboutView />
  </MainLayout>
);

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
