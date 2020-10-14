import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUserToken1602704299945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_token',
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "token",
                    type: "uuid",
                    generationStrategy: "uuid",
                    default: 'uuid_generate_v4()'
                }, 
                {
                    name: "user_id",
                    type: "uuid",
                }
            ],
            foreignKeys: [
                {
                    name: 'TokenUser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'], // id do usuário
                    columnNames: ['user_id'], // user_id 
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_token');
    }

}
