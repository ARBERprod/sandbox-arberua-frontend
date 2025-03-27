import { User } from '@/entities/User';
import { IsPopupShowed, SessionCity } from '../../api/types';

export interface SessionSchema {
  userData: User | null;
  city: SessionCity | null;
  isPopupShowed: IsPopupShowed;
  isLoaded: boolean;
  isFetching: boolean;
}
