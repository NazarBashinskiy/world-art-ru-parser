import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMoviesTable1625067640485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable (new Table({
            name: 'movies',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'world_art_id',
                    type: 'int'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'country_ids',
                    type: 'int[]',
                    isNullable: true
                },
                {
                    name: 'genre_ids',
                    type: 'int[]',
                    isNullable: true
                },
                {
                    name: 'year',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'actors',
                    type: 'varchar[]',
                    isNullable: true
                },
                {
                    name: 'rate',
                    type: 'decimal',
                    isNullable: true
                }
            ]
        }));
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }

}
