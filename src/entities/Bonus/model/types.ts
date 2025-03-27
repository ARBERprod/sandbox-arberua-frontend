export type BonusType = 'earn' | 'spend';

export interface Bonus {
  id: string;
  created_at: string;
  content: string;
  amount: number;
  type: BonusType;
}
