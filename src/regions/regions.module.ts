import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Region } from "./entities/region.entity";
import { RegionsController } from "./regions.controller";
import { RegionsService } from "./regions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Region]), AuthModule],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
