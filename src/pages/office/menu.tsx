import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthChecker } from '@/providers/AuthChecker';
import { OfficeMenuView } from '@/views/OfficeMenuView';
import { wrapper } from '@/shared/config/store/makeStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MenuPage = () => (
  <AuthChecker privateRoute>
    <MainLayout>
      <OfficeMenuView />
    </MainLayout>
  </AuthChecker>
);

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'office-page',
    ])),
  },
}));

export default MenuPage;
