import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ROLES } from "../auth/constans/roles.constans";
import { ApiAuth } from "../auth/decorators/api.decorator";
import { Auth } from "../auth/decorators/auth.decorator";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { RegionsService } from "./regions.service";

@ApiAuth()
@ApiTags("Regions")
@Controller("regions")
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Auth()
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.regionsService.findOne(+id);
  }

  @Auth()
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Auth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.regionsService.remove(+id);
  }
}
