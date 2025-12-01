import { User } from '@/entities/User';
import { CartData } from '@/entities/Cart';
import { Product } from '@/entities/Product';

export type SignInBody = {
  login: string;
  password: string;
}

export type IsPopupShowed = 'shouldBe' | 'showed' | 'notShouldBe';

export type SignUpBody = {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  birthday: string;
  phone: string;
  password: string;
  password_confirmation: string;
  eventId?: string;
}

export type SessionCity = {
  id: string;
  title: string;
  status: number;
  latitude: string;
  longitude: string;
}

export type SessionDto = {
  success: true;
  data: {
    cart: CartData;
    wishlist?: Product[];
    comparsion?: [];
    city?: SessionCity;
    user?: User;
    isPopupShowed?: IsPopupShowed;
  }
}
