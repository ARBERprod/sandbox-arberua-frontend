import { MainLayout } from '@/layouts/MainLayout';
import { AboutView } from '@/views/AboutView';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AboutPage = () => (
  <MainLayout
    metaData={{
      title: 'Історія та цінності українського бренду одягу',
      description: 'Дізнайтеся більше про бренд ARBER – український виробник стильного чоловічого та жіночого одягу. Історія, місія та цінності бренду, що поєднує якість та актуальний дизайн.',
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
      'about-page',
    ])),
  },
});

export default AboutPage;
