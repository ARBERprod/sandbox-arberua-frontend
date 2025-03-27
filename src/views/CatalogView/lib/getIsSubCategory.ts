import { Category } from '@/entities/Category';

export const getIsSubCategory = (category?: Category) => {
  if (!category) return false;
  if (category.is_null) return false;

  return true;
};
