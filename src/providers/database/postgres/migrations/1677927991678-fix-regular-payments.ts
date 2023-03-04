import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRegularPayments1677927991678 implements MigrationInterface {
    name = 'fixRegularPayments1677927991678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regular_payment" ALTER COLUMN "notes" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regular_payment" ALTER COLUMN "notes" SET NOT NULL`);
    }

}
