import { Express, Request, Response } from 'express';

import { BaseGlossaryDto } from './DTO/base-glossary.dto';
import { getCountryGlossary, getGenresGlossary } from './glossary.service';

export async function glossaryController (app: Express) {
  app.get('/glossary/country', (req: Request<null>, res: Response<Array<BaseGlossaryDto>>) => {
    res.json(getCountryGlossary());
  });

  app.get('/glossary/genre', (req: Request<null>, res: Response<Array<BaseGlossaryDto>>) => {
    res.json(getGenresGlossary());
  });
}
