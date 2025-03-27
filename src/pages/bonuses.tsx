import { MainLayout } from '@/layouts/MainLayout';
import { BonusesView } from '@/views/BonusesView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BonusesPage = () => (
  <MainLayout
    metaData={{
      title: 'Програма лояльності – Знижки та бонуси для постійних клієнтів',
      description: 'Приєднуйтесь до програми лояльності ARBER та отримайте Welcome бонус. Реєструйтесь на сайті чи в Чат-боті, робіть покупки в 70+ магазинах по всій Україні та використовуйте бонуси: до 40% на товари без знижки та до 20% на товари зі знижкою.',
    }}
    withFooter
  >
    <BonusesView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'bonuses',
    ])),
  },
}));

export default BonusesPage;
