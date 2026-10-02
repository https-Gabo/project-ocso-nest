import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ROLES } from "../auth/constans/roles.constans";
import { ApiAuth } from "../auth/decorators/api.decorator";
import { Auth } from "../auth/decorators/auth.decorator";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { LocationsService } from "./locations.service";

@ApiAuth()
@Controller("locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Auth()
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.locationsService.findOne(+id);
  }

  @Auth(ROLES.MANAGER)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Auth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.locationsService.remove(+id);
  }
}
