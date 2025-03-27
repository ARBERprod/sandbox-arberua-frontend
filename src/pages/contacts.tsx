import { MainLayout } from '@/layouts/MainLayout';
import { ContactsView } from '@/views/ContactsView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContactsPage = () => (
  <MainLayout metaData={{
    title: 'Контакти – Залишилися питання? Зв\'яжіться з ARBER для отримання допомоги',
    description: 'Маєте питання про замовлення чи продукцію ARBER? Ми завжди раді допомогти! Зв’яжіться з нами для отримання консультації або додаткової інформації.',
  }}
  >
    <ContactsView />
  </MainLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'contacts-page',
    ])),
  },
}));

export default ContactsPage;
