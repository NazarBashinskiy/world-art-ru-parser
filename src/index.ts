import 'reflect-metadata';

import { config } from 'dotenv';
import { createConnection } from 'typeorm';

import { createJob } from './parsing/parsing.service';
import { server } from './server/server';

config();

const main = async (): Promise<void> => {
  await createConnection();
  createJob();
  await server();
}
main().then()
