import { MigrationInterface, QueryRunner } from "typeorm";

export class Entitees1697728980449 implements MigrationInterface {
    name = 'Entitees1697728980449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_note_setting" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "noteId" integer, CONSTRAINT "PK_cc492e284c31b5def9bb6590508" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_question_state" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "questionId" integer, CONSTRAINT "PK_2c3a64b291d4f9dc16bae8280c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rate" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rate" integer NOT NULL, "userId" integer, "noteId" integer, "questionId" integer, CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "question" character varying NOT NULL, "answer" character varying NOT NULL, "noteId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_c1872643429ea977256802b0974" UNIQUE ("title"), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" ADD CONSTRAINT "FK_7a19a9818d92d9a65e26d93e112" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" ADD CONSTRAINT "FK_2904f02bf3d39b6fe2e259346f1" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_question_state" ADD CONSTRAINT "FK_4270cf6e3566f07df7ca47fa6d3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_question_state" ADD CONSTRAINT "FK_288f8ae44df41c345cd304b1f46" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_7440b44c5acbec8b2ebfc3af7d2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_3371bb0d306932f49853a2d3608" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rate" ADD CONSTRAINT "FK_93e2fa936abc516ef435ac0ea11" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_6c95401a4d58d4f9bc990682c97" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_6c95401a4d58d4f9bc990682c97"`);
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_93e2fa936abc516ef435ac0ea11"`);
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_3371bb0d306932f49853a2d3608"`);
        await queryRunner.query(`ALTER TABLE "rate" DROP CONSTRAINT "FK_7440b44c5acbec8b2ebfc3af7d2"`);
        await queryRunner.query(`ALTER TABLE "user_question_state" DROP CONSTRAINT "FK_288f8ae44df41c345cd304b1f46"`);
        await queryRunner.query(`ALTER TABLE "user_question_state" DROP CONSTRAINT "FK_4270cf6e3566f07df7ca47fa6d3"`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" DROP CONSTRAINT "FK_2904f02bf3d39b6fe2e259346f1"`);
        await queryRunner.query(`ALTER TABLE "user_note_setting" DROP CONSTRAINT "FK_7a19a9818d92d9a65e26d93e112"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "rate"`);
        await queryRunner.query(`DROP TABLE "user_question_state"`);
        await queryRunner.query(`DROP TABLE "user_note_setting"`);
    }

}
