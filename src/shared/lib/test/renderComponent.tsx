import { ReactNode } from 'react';
import { DeepPartial } from 'redux';
import { I18nextProvider } from 'react-i18next';
import '@/styles/globals.scss';
import { render } from '@testing-library/react';
import { FloatingProvider } from '@/shared/lib/components/FloatingProvider';
import { ConfirmModalProvider } from '@/shared/lib/components/ConfirmModalProvider';
import { ReducersList, StoreSchema } from '@/shared/types/store';
import { StoreProvider } from '@/providers/StoreProvider/StoreProvider';
import i18n from './i18nForTest';
import { createMockRouter } from './createMockRouter';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

interface RenderComponentOptions {
  initialState?: DeepPartial<StoreSchema>;
  asyncReducers?: ReducersList;
  router?: Partial<NextRouter>;
}

export const renderComponent = (component: ReactNode, options?:RenderComponentOptions) => {
  const AppProvider = (
    <RouterContext.Provider value={createMockRouter(options?.router || {})}>
      <I18nextProvider i18n={i18n}>
        <FloatingProvider>
          <ConfirmModalProvider>
            <StoreProvider initialState={options?.initialState as StoreSchema} asyncReducers={options?.asyncReducers}>
              {component}
              <div id="portal" />
            </StoreProvider>
          </ConfirmModalProvider>
        </FloatingProvider>
      </I18nextProvider>
    </RouterContext.Provider>
  );

  return render(AppProvider);
};
