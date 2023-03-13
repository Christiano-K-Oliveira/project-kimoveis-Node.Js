import { MigrationInterface, QueryRunner } from "typeorm";

export class realEstateSchedules1678559660820 implements MigrationInterface {
    name = 'realEstateSchedules1678559660820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" DROP CONSTRAINT "FK_0cfc0ef476df1c3feec00d42532"`);
        await queryRunner.query(`CREATE TABLE "real_estate_schedule_schedules_users_properties" ("realEstateId" integer NOT NULL, "schedulesUsersPropertiesId" integer NOT NULL, CONSTRAINT "PK_23a04ab71b52aa942d3ef30fa48" PRIMARY KEY ("realEstateId", "schedulesUsersPropertiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f407501a86366397f4f343174" ON "real_estate_schedule_schedules_users_properties" ("realEstateId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea3ae8f3cd8f8b85071f87b828" ON "real_estate_schedule_schedules_users_properties" ("schedulesUsersPropertiesId") `);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" ADD CONSTRAINT "FK_0cfc0ef476df1c3feec00d42532" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate_schedule_schedules_users_properties" ADD CONSTRAINT "FK_7f407501a86366397f4f343174e" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "real_estate_schedule_schedules_users_properties" ADD CONSTRAINT "FK_ea3ae8f3cd8f8b85071f87b828d" FOREIGN KEY ("schedulesUsersPropertiesId") REFERENCES "schedules_users_properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate_schedule_schedules_users_properties" DROP CONSTRAINT "FK_ea3ae8f3cd8f8b85071f87b828d"`);
        await queryRunner.query(`ALTER TABLE "real_estate_schedule_schedules_users_properties" DROP CONSTRAINT "FK_7f407501a86366397f4f343174e"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" DROP CONSTRAINT "FK_0cfc0ef476df1c3feec00d42532"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea3ae8f3cd8f8b85071f87b828"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f407501a86366397f4f343174"`);
        await queryRunner.query(`DROP TABLE "real_estate_schedule_schedules_users_properties"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" ADD CONSTRAINT "FK_0cfc0ef476df1c3feec00d42532" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
