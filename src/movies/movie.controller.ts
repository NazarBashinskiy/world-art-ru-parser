import { Express, Request, Response } from 'express';
import { GetMovieDto } from './DTO/get-movie.dto';
import { Movie } from './movie.entity';
import { getMovieByWorldArtId } from './movie.service';

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
}
