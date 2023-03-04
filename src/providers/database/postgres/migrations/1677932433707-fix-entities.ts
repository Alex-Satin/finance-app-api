import { MigrationInterface, QueryRunner } from "typeorm";

export class fixEntities1677932433707 implements MigrationInterface {
    name = 'fixEntities1677932433707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "hashedPassword" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "operation" ADD "notes" character varying`);
        await queryRunner.query(`ALTER TABLE "regular_payment" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "regular_payment" ADD "notes" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regular_payment" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "regular_payment" ADD "notes" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "operation" ADD "notes" text`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashedPassword"`);
    }

}
