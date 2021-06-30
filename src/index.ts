import 'reflect-metadata';

import { config } from 'dotenv';
import { createConnection } from 'typeorm';

config();

const main = async (): Promise<void> => {
  await createConnection();
}
main().then()