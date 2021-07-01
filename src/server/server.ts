import express from 'express';
import cors from 'cors';

import { json } from 'body-parser'

import { controllers } from './controllers';
import { exceptionFilter } from './exception-filter';

export async function server (): Promise<void> {
  const app = express();

  app.use(json());
  app.use(cors());

  await controllers(app);

  app.use(exceptionFilter)

  app.listen(3000, () => console.log(`App started at 3000 port`));
}
