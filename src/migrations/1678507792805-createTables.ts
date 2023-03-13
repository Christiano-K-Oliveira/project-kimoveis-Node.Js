import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1678507792805 implements MigrationInterface {
    name = 'createTables1678507792805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(7), "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" numeric NOT NULL, "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_44ae17efa35575b6a6f83b35ee" UNIQUE ("addressId"), CONSTRAINT "PK_8735a23fd5adc2afb18242894ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules_users_properties" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, CONSTRAINT "PK_751450246dee9abc82a47dabc4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules_users_properties_real_estate_real_estate" ("schedulesUsersPropertiesId" integer NOT NULL, "realEstateId" integer NOT NULL, CONSTRAINT "PK_5e62e9d96518fbb6c4cb729a2a6" PRIMARY KEY ("schedulesUsersPropertiesId", "realEstateId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ba239913db0876efe4654bb67f" ON "schedules_users_properties_real_estate_real_estate" ("schedulesUsersPropertiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0cfc0ef476df1c3feec00d4253" ON "schedules_users_properties_real_estate_real_estate" ("realEstateId") `);
        await queryRunner.query(`CREATE TABLE "schedules_users_properties_user_users" ("schedulesUsersPropertiesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_13ba0bfb033dff05bfcb14cf0cf" PRIMARY KEY ("schedulesUsersPropertiesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c3cb02b2f0e393900ce9ae65a" ON "schedules_users_properties_user_users" ("schedulesUsersPropertiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2330a55d197fa9ee29c8ef00e8" ON "schedules_users_properties_user_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_44ae17efa35575b6a6f83b35ee5" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_e64472d578faf91bee90a06ecc0" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" ADD CONSTRAINT "FK_ba239913db0876efe4654bb67f8" FOREIGN KEY ("schedulesUsersPropertiesId") REFERENCES "schedules_users_properties"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" ADD CONSTRAINT "FK_0cfc0ef476df1c3feec00d42532" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_user_users" ADD CONSTRAINT "FK_2c3cb02b2f0e393900ce9ae65ac" FOREIGN KEY ("schedulesUsersPropertiesId") REFERENCES "schedules_users_properties"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_user_users" ADD CONSTRAINT "FK_2330a55d197fa9ee29c8ef00e86" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_user_users" DROP CONSTRAINT "FK_2330a55d197fa9ee29c8ef00e86"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_user_users" DROP CONSTRAINT "FK_2c3cb02b2f0e393900ce9ae65ac"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" DROP CONSTRAINT "FK_0cfc0ef476df1c3feec00d42532"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties_real_estate_real_estate" DROP CONSTRAINT "FK_ba239913db0876efe4654bb67f8"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_e64472d578faf91bee90a06ecc0"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_44ae17efa35575b6a6f83b35ee5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2330a55d197fa9ee29c8ef00e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c3cb02b2f0e393900ce9ae65a"`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties_user_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0cfc0ef476df1c3feec00d4253"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ba239913db0876efe4654bb67f"`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties_real_estate_real_estate"`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
