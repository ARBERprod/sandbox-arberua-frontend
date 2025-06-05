import { StoreSchema } from '@/shared/types/store';
import { User } from '@/entities/User';

export const getRawUserData = (state: StoreSchema): User | null => state.user?.data ?? null;
