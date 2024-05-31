export interface Review {
  id: number;
  title: string;
  content: string;
}

export interface ViewProps {
  data: Review[];
}
