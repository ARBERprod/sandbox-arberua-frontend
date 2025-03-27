import { Order } from '@/entities/Order';

export interface OfficeOrderSchema {
  isModalOpen: boolean;
  chosenOrder: Order | null;
}
