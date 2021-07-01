import 'reflect-metadata';

import { config } from 'dotenv';
import { createConnection } from 'typeorm';

import { createJob } from './parsing/parsing.service';

config();

const main = async (): Promise<void> => {
  await createConnection();
  createJob();
}
main().then()
