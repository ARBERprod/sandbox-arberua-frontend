import { Address } from '@/entities/Address';

export interface User {
  addresses: Address[];
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;
  phone: string;
  bonus_balance: number;
  sex: 'male' | 'female' | null;
  birthday: string | null;
  user_id: string;
}

export interface UserSchema {
  data: User | null;
  userInit: boolean;
}
