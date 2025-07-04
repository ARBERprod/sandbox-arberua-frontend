import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';
import { LookConstructorSchema } from '@/views/LookConstructorView';
import { InstagramViewSchema } from '@/views/InstagramView';
import { FaqViewSchema } from '@/views/FaqView';
import { InstagramFeedbackSchema } from '@/entities/InstagramFeedback';
import { EditPersonalDataSchema } from '@/features/EditPersonalData';
import { SiteSettingsSchema } from '@/features/SiteSettings';
import { CallbackSchema } from '@/features/CallBack';
import { SearchSchema } from '@/features/Search';
import { CheckoutSchema } from '@/widgets/Checkout';
import { CartSchema } from '@/entities/Cart/model/types/cartSchema';
import { ProductFilterSchema } from '@/features/ProductFilter';
import { SessionSchema } from '@/entities/Session';
import { OfficeOrderSchema } from '@/views/OfficeOrdersView';
import { WishListSchema } from '@/entities/WishList';
import { SendCommentButtonSchema } from '@/widgets/SendCommentButton';
import { EditConsultationSchema } from '@/features/consultation/EditConsultation';
import { Context } from 'next-redux-wrapper';
import { SignUpForConsultationSchema } from '@/features/consultation/SignUpForConsultation';
import { AuthSchema } from '@/widgets/Auth';
import { RecoverPasswordSchema } from '@/features/auth/RecoverPassword';
import { TotalLookViewSchema } from '@/views/TotalLookView';
import { UISchema } from '@/entities/UI';
import { ProductSortSchema } from '@/features/ProductSort';
import { AuthBySocialsSchema } from '@/features/auth/AuthBySocials';
import { BuyInOneClickCartSchema } from '@/features/cart/BuyInOneClick';
import { PreorderProductSchema } from '@/features/PreOrderProduct';
import { ProductAvailabilitySchema } from '@/widgets/ProductAvailability';
import { UserSchema } from '@/entities/User/model/types';

export interface StoreSchema {
  auth: AuthSchema;
  cart: CartSchema;
  buyInOneClick: BuyInOneClickCartSchema;
  siteSettings: SiteSettingsSchema;
  session: SessionSchema;
  wishList: WishListSchema;
  search: SearchSchema;
  ui: UISchema;
  user?: UserSchema;

  lookConstructor?: LookConstructorSchema;
  preorderProduct?: PreorderProductSchema;
  authBySocialsSchema?: AuthBySocialsSchema;
  productFilter?: ProductFilterSchema;
  productAvailability?: ProductAvailabilitySchema;
  productSort?: ProductSortSchema;
  checkout?: CheckoutSchema;
  instagramPage?: InstagramViewSchema;
  faqPage?: FaqViewSchema;
  instagramFeedback?: InstagramFeedbackSchema;
  editPersonalData?: EditPersonalDataSchema;
  callback?: CallbackSchema;
  officeOrders?: OfficeOrderSchema;
  sendComment?: SendCommentButtonSchema;
  editConsultation?: EditConsultationSchema;
  signUpForConsultation?: SignUpForConsultationSchema;
  recoverPassword?: RecoverPasswordSchema;
  totalLookView?: TotalLookViewSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export type StoreSchemaKey = keyof StoreSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StoreSchema>;
  reduce: (state: StoreSchema, action: AnyAction) => CombinedState<StoreSchema>;
  add: (key: StoreSchemaKey, reducer: Reducer) => void;
  remove: (key: StoreSchemaKey) => void;
}

export interface ReduxStoreWithReducerManager extends EnhancedStore<StoreSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  context?: Context;
}

export interface ThunkConfig<Error> {
  rejectValue: Error;
  extra: ThunkExtraArg;
  state: StoreSchema;
}

export type StateSchemaKey = keyof StoreSchema;

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StoreSchema[name]>>;
};
