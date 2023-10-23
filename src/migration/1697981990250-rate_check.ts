import { MigrationInterface, QueryRunner } from "typeorm";

export class RateCheck1697981990250 implements MigrationInterface {
    name = 'RateCheck1697981990250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "CHK_659eca218a0cd5d2b00c49fce7" CHECK ("rate" > 0 AND "rate" <= 5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "CHK_659eca218a0cd5d2b00c49fce7"`);
    }

}
