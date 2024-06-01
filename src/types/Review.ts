export interface Review {
  id: number;
  title: string;
  content: string;
  price: string;
}

export interface ViewProps {
  data: Review[];
}
