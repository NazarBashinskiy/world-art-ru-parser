import express from 'express';
import cors from 'cors';

import { json } from 'body-parser'

export async function server (): Promise<void> {
  const app = express();

  app.use(json());
  app.use(cors());

  app.listen(3000, () => console.log(`App started at 3000 port`));
}
