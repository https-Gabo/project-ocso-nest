import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Manager } from "./entities/manager.entity";
import { ManagersController } from "./managers.controller";
import { ManagersService } from "./managers.service";

@Module({
  imports: [TypeOrmModule.forFeature([Manager]), AuthModule],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
