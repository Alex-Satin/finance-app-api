import { MigrationInterface, QueryRunner } from "typeorm";

export class addImageid1680512394564 implements MigrationInterface {
    name = 'addImageid1680512394564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileImageId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileImageId"`);
    }

}
