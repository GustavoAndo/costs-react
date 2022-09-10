import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662836925189 implements MigrationInterface {
    name = 'default1662836925189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "budget" numeric(10,2) NOT NULL, "cost" numeric(10,2) NOT NULL, "category_id" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services_project" ("service_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_c96b11cda6a44e5089f1a9557c1" PRIMARY KEY ("service_id", "project_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d261caf193b25974f7829dd915" ON "services_project" ("service_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc41bc51ff7985e7257c66cf06" ON "services_project" ("project_id") `);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c1345700580c6c6b17200647bcc" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services_project" ADD CONSTRAINT "FK_d261caf193b25974f7829dd915f" FOREIGN KEY ("service_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_project" ADD CONSTRAINT "FK_dc41bc51ff7985e7257c66cf066" FOREIGN KEY ("project_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_project" DROP CONSTRAINT "FK_dc41bc51ff7985e7257c66cf066"`);
        await queryRunner.query(`ALTER TABLE "services_project" DROP CONSTRAINT "FK_d261caf193b25974f7829dd915f"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c1345700580c6c6b17200647bcc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc41bc51ff7985e7257c66cf06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d261caf193b25974f7829dd915"`);
        await queryRunner.query(`DROP TABLE "services_project"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
