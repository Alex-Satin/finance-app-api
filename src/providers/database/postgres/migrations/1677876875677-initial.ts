import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1677876875677 implements MigrationInterface {
    name = 'initial1677876875677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('UNVERIFIED', 'ACTIVE', 'BLOCKED')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."user_status_enum" NOT NULL DEFAULT 'UNVERIFIED', "email" character varying NOT NULL, "phone" character varying NOT NULL, "companyName" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "currency" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_d4a19e7dc60ccc27442fda21eaf" UNIQUE ("name", "currency"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "imagePath" character varying NOT NULL, "isEnabled" boolean NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."operation_operationtype_enum" AS ENUM('INCOME', 'OUTGO')`);
        await queryRunner.query(`CREATE TABLE "operation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "currency" character varying NOT NULL, "operationType" "public"."operation_operationtype_enum" NOT NULL, "notes" text, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, "categoryId" uuid, "userId" uuid, CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."regular_payment_operationtype_enum" AS ENUM('INCOME', 'OUTGO')`);
        await queryRunner.query(`CREATE TABLE "regular_payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isEnabled" boolean NOT NULL, "amount" numeric NOT NULL, "currency" character varying NOT NULL, "operationType" "public"."regular_payment_operationtype_enum" NOT NULL, "notes" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, "categoryId" uuid, "userId" uuid, CONSTRAINT "PK_ad8e419f987478e78acb4521c2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_5a1cec203fc9280aea0ab3128bc" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_54d44174fb89e86a63f2f226cdf" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_7df4a22dbf4c663666e21c21123" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "regular_payment" ADD CONSTRAINT "FK_eb87c8edd039abbc8f3db432362" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "regular_payment" ADD CONSTRAINT "FK_d325ab6ec69b9ce70d11fd037c0" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "regular_payment" ADD CONSTRAINT "FK_931273367032eca91990a635907" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regular_payment" DROP CONSTRAINT "FK_931273367032eca91990a635907"`);
        await queryRunner.query(`ALTER TABLE "regular_payment" DROP CONSTRAINT "FK_d325ab6ec69b9ce70d11fd037c0"`);
        await queryRunner.query(`ALTER TABLE "regular_payment" DROP CONSTRAINT "FK_eb87c8edd039abbc8f3db432362"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_7df4a22dbf4c663666e21c21123"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_54d44174fb89e86a63f2f226cdf"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_5a1cec203fc9280aea0ab3128bc"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`);
        await queryRunner.query(`DROP TABLE "regular_payment"`);
        await queryRunner.query(`DROP TYPE "public"."regular_payment_operationtype_enum"`);
        await queryRunner.query(`DROP TABLE "operation"`);
        await queryRunner.query(`DROP TYPE "public"."operation_operationtype_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
