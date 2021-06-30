require('dotenv').config();

module.exports = {
   type: 'postgres',
   host: process.env.POSTGRES_HOST,
   port: process.env.POSTGRES_PORT,
   username: process.env.POSTGRES_USER,
   password: process.env.POSTGRES_PASSWORD,
   database: process.env.POSTGRES_DB,
   synchronize: false,
   logging: true,
   entities: [ 'src/**/**.entity.ts' ],
   migrations: [ 'migrations/**/*.ts' ],
   cli: {
      migrationsDir: 'migrations'
   }
}
