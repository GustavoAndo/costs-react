import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662837718300 implements MigrationInterface {
    name = 'default1662837718300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "cost" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "cost" DROP DEFAULT`);
    }

}
