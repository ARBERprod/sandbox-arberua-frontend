export interface Comment {
  id: string;
  created_at: string;
  content: string;
  rating: number;
  author: {
    id: string;
    first_name: string;
    last_name: string;
  };
}
