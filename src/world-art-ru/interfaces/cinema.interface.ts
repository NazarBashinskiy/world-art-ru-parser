export interface ICinema {
  title: string;
  countries: Array<string>;
  format: string;
  duration: string;
  genres: Array<string>;
  firstShow?: string;
  director?: string;
  idea?: string;
  composer?: string;
  actors?: Array<string>;
  rate: number;
  placeInTop?: number;
  description?: string;
}
