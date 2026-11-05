import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAirline1793845829982 implements MigrationInterface {
    name = 'CreateAirline1793845829982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_5adc4561cb3955076e684098b63"`);
        await queryRunner.query(`CREATE TABLE "airline" ("id" SERIAL NOT NULL, "airlineCode" character varying NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "UQ_1b68324fa58cd6c18145fc2eb0a" UNIQUE ("airlineCode"), CONSTRAINT "PK_9a0dd52135c26e0201205412623" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "airportId"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "departureAirportRelationId" integer`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "destinationAirportRelationId" integer`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_415c5fdd8918328c884b952105c" FOREIGN KEY ("departureAirportRelationId") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_3a2c1ebda9c80713a37a55a02b1" FOREIGN KEY ("destinationAirportRelationId") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_3a2c1ebda9c80713a37a55a02b1"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_415c5fdd8918328c884b952105c"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "destinationAirportRelationId"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departureAirportRelationId"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "airportId" integer`);
        await queryRunner.query(`DROP TABLE "airline"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_5adc4561cb3955076e684098b63" FOREIGN KEY ("airportId") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
