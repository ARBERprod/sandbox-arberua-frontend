export type FilterValue = string | (string[])

export interface ProductFilterSchema {
  isOpen: boolean;
  initValues: { [key: string]: FilterValue };
  values: { [key: string]: FilterValue };
}
