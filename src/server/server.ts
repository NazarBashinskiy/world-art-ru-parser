import express from 'express';
import cors from 'cors';

import { json } from 'body-parser'
import { controllers } from './controllers';

export async function server (): Promise<void> {
  const app = express();

  app.use(json());
  app.use(cors());

  await controllers(app);

  app.listen(3000, () => console.log(`App started at 3000 port`));
}
