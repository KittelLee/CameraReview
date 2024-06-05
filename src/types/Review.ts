export interface Review {
  id: number;
  title: string;
  content: string;
  price: string;
  brand: string;
  rating: number;
}

export interface ViewProps {
  data: Review[];
}
