import { MigrationInterface, QueryRunner } from "typeorm";

export class Justincase1697977227880 implements MigrationInterface {
    name = 'Justincase1697977227880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "CHK_b8fe17ee719e8f1f571c4d024c" CHECK ("rate" > 0 AND "rate" < 5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "CHK_b8fe17ee719e8f1f571c4d024c"`);
    }

}
