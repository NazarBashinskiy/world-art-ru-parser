import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'world_art_id' })
  worldArtId: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column('int',{ name: 'country_ids', array: true })
  countryIds: Array<number>;

  @Column('int',{ name: 'genre_ids', array: true })
  genreIds: Array<number>;

  @Column()
  description: string;

  @Column('varchar',{ array: true })
  actors: Array<string>

  @Column()
  rate: number;
}
