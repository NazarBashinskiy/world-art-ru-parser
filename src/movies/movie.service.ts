import { getRepository } from 'typeorm';

import { getCountryByName, getGenreByName } from '../glossaries/glossary.service';
import { ICinemaListItem } from '../world-art-ru/interfaces/cinema-list-item.interface';
import { Movie } from './movie.entity';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { IGetAllMoviesCriteria } from './interfaces/get-all-movies-criteria.interface';

async function createMovie (movie: ICinemaListItem): Promise<Movie> {
  const movieRepository = getRepository(Movie);
  const movieExist = !!await movieRepository.findOne({ where: { worldArtId: movie.id } });
  if (movieExist) {
    throw new BadRequestException('This movie already exists');
  }
  const genreIds = movie.genres.map(genreName => getGenreByName(genreName)?.id);
  const countryIds = movie.countries.map(countryName => getCountryByName(countryName)?.id);
  const worldArtId = movie.id;
  const createdMovie = await movieRepository.create({ ...movie, worldArtId, genreIds, countryIds });
  return movieRepository.save(createdMovie);
}

async function getMovieByWorldArtId (worldArtId: number|string): Promise<Movie> {
  const movieRepository = getRepository(Movie);
  const movie = await movieRepository.findOne({ where: { worldArtId } });
  if (!!movie) {
    return movie;
  } else {
    throw new NotFoundException('This movie doesn\'t exist');
  }
}

async function getAllMovies (criteria: IGetAllMoviesCriteria): Promise<Array<Movie>> {
  const movieRepository = getRepository(Movie);
  return movieRepository
    .createQueryBuilder('movie')
    .select()
    .where(':genreId = ANY(movie.genreIds)', { genreId: criteria.genreId })
    .andWhere(':countryId = ANY(movie.countryIds)', { countryId: criteria.countryId })
    .andWhere('movie.year = :year', { year: criteria.year })
    .andWhere('movie.title ILIKE :name', { name: `%${criteria.name}%` })
    .getMany();
}

export { createMovie, getMovieByWorldArtId, getAllMovies };
