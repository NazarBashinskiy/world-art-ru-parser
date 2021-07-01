import { Express } from 'express';

import { glossaryController } from '../glossaries/glossary.controller';
import { movieController } from '../movies/movie.controller';
import { parsingController } from '../parsing/parsing.controller';

export async function controllers(app: Express): Promise<void> {
  await glossaryController(app);
  await movieController(app);
  await parsingController(app);
}
