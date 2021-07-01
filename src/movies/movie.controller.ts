import { Express, Request, Response } from 'express';

import { GetMovieDto } from './DTO/get-movie.dto';
import { Movie } from './movie.entity';
import { getMovieByWorldArtId, getAllMovies } from './movie.service';
import { GetAllMoviesDto } from './DTO/get-all-movies.dto';

export async function movieController (app: Express): Promise<void> {
  app.get('/movie', async (req: Request<null, null, null, GetMovieDto>, res: Response<Movie>, next) => {
    try {
      const { worldArtId } = req.query;
      const movie = await getMovieByWorldArtId(worldArtId);
      res.json(movie);
    } catch (e) {
      next(e);
    }
  });

  app.get('/movie/all', async (req: Request<null, null, null, GetAllMoviesDto>, res: Response<Array<Movie>>, next) => {
    try {
      const query = req.query;
      const criteria = {
        name: query.name,
        genreId: parseInt(query.genreId) || null,
        countryId: parseInt(query.countryId) || null,
        year: parseInt(query.year) || null
      };
      const movies = await getAllMovies(criteria);
      res.json(movies);
    } catch (e) {
      next(e);
    }
  });
}
