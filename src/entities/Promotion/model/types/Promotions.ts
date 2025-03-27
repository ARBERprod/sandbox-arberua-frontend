export interface PromotionsItem {
  title: string;
  start_date: string;
  end_date: string;
  is_started: boolean;
  picture: string;
  has_seconds_until_end: number;
  link?: string;
  description?: string;
}
