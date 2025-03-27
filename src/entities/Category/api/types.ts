import { SuccessApiResponse } from '@/shared/types/api';
import { Category } from '../model/types';

export type CategoriesDto = SuccessApiResponse<Category[]>
