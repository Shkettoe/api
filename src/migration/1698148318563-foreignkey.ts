import { MigrationInterface, QueryRunner } from "typeorm";

export class Foreignkey1698148318563 implements MigrationInterface {
    name = 'Foreignkey1698148318563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_note_setting" DROP CONSTRAINT "FK_2904f02bf3d39b6fe2e259346f1"`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" RENAME COLUMN "noteId" TO "note_id"`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" ALTER COLUMN "note_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" ADD CONSTRAINT "FK_1dcb7a022132918a60fedbf2c34" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_note_setting" DROP CONSTRAINT "FK_1dcb7a022132918a60fedbf2c34"`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" ALTER COLUMN "note_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" RENAME COLUMN "note_id" TO "noteId"`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" ADD CONSTRAINT "FK_2904f02bf3d39b6fe2e259346f1" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
