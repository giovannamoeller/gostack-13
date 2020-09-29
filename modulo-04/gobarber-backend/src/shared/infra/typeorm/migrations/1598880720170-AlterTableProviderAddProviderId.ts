import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterTableProviderAddProviderId1598880720170 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL', // RESTRICT - não deixa o usuario deletar. SET NULL - o id fica nulo. CASCADE - deleta tudo
            onUpdate: 'CASCADE' // se o usuário tiver o id alterado, tem que alterar tudo
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // desfaz na ordem reversa
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: "provider",
            type: "uuid",
        }));

    }

}
