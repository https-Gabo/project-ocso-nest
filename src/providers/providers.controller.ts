import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ROLES } from "../auth/constans/roles.constans";
import { Auth } from "../auth/decorators/auth.decorator";
import { UserData } from "../auth/decorators/user.decorator";
import { User } from "../auth/entities/user.entity";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { ProvidersService } from "./providers.service";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes("Employee")) {
      throw new NotFoundException(
        "You don't have permission to access this resource",
      );
    }
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get("name/:name")
  findbyName(@Param("name") name: string) {
    return this.providersService.findOneByName(name);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const provider = await this.providersService.findOne(id);
    if (!provider) throw new NotFoundException();
    return provider;
  }

  @Auth(ROLES.MANAGER)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}
