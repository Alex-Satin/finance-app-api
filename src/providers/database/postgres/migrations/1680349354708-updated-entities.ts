import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedEntities1680349354708 implements MigrationInterface {
    name = 'updatedEntities1680349354708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_d4a19e7dc60ccc27442fda21eaf"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "isEnabled" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_7a18d39e02c580d7c26184b14e2" UNIQUE ("name", "currency", "userId")`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_7a18d39e02c580d7c26184b14e2"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "isEnabled" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_d4a19e7dc60ccc27442fda21eaf" UNIQUE ("name", "currency")`);
    }

}
