import { Express, Request, Response } from 'express';

import Bull from 'bull';

import { getParsingStatus, startParsing } from './parsing.service';

export async function parsingController (app: Express): Promise<void> {
  app.post('/parser/start', async (req: Request<null>, res: Response<Record<string, string>>, next) => {
    try {
      await startParsing();
      res.json({ message: 'Parsing started' });
    } catch (e) {
      next(e);
    }
  });

  app.get('/parser/status', async (req: Request<null>, res: Response<Bull.JobCounts>) => {
    const status = await getParsingStatus();
    res.json(status);
  });
}
