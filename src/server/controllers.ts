import { Express } from 'express';
import { glossaryController } from '../glossaries/glossary.controller';

export async function controllers(app: Express): Promise<void> {
  await glossaryController(app);
}
