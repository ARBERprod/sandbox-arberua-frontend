import React from "react";
import type { Preview } from "@storybook/react";
import { StyleDecorator } from "@/shared/config/storybook/StyleDecorator/StyleDecorator";
import { FloatDecorator } from "@/shared/config/storybook/FloatDecorator";
import { ConfirmModalDecorator } from "@/shared/config/storybook/ConfirmModalDecorator";
import i18n from './i18n-storybook';
import 'reflect-metadata';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const preview: Preview = {
   parameters: {
      actions: { argTypesRegex: "^on[A-Z].*" },
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
         },
      },
   },
   decorators: [i18n, StyleDecorator, FloatDecorator, StoreDecorator({}), ConfirmModalDecorator],
   globalTypes: {
      locale: {
         name: 'Locale',
         description: 'Internationalization locale',
         toolbar: {
            icon: 'globe',
            items: [
               {
                  value: 'uk', title: 'Ukr', right: 'uk',
               },
               {
                  value: 'ru', title: 'Rus', right: 'ru',
               }
            ]
         }
      }
   }
};

export default preview;
