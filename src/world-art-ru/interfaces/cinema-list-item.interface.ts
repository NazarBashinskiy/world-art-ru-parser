export interface ICinemaListItem {
  id: number;
  title: string;
  year: number;
  countries: Array<string>;
  genres: Array<string>;
  description?: string;
  actors: Array<string>
  rate: number;
}
