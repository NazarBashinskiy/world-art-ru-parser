require('dotenv').config();

module.exports = {
   type: process.env.DB_TYPE,
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   synchronize: false,
   logging: true,
   entities: [ 'src/**/**.entity.ts' ],
   migrations: [ 'migrations/**/*.ts' ],
   cli: {
      migrationsDir: 'migrations'
   }
}
