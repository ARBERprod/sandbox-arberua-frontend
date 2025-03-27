import { MainLayout } from '@/layouts/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SizesView } from '@/views/SizesView';
import { wrapper } from '@/shared/config/store/makeStore';
import { Language } from '@/shared/config/lang';

const SizesPage = () => (
  <MainLayout metaData={{
    title: 'Як вибрати правильний розмір – Розмірна сітка для чоловічого та жіночого одягу',
    description: 'Зручна розмірна сітка від ARBER для точного вибору чоловічого та жіночого одягу. Оберіть свій ідеальний розмір і замовляйте без вагань.',
  }}
  >
    <SizesView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? Language.UKRAINIAN, ['common', 'sizes'])),
  },
}));

export default SizesPage;
