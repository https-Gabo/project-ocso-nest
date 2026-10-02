import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserData } from "../auth/decorators/user.decorator";
import { User } from "../auth/entities/user.entity";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { ProvidersService } from "./providers.service";

@UseGuards(AuthGuard)
@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
  @Roles(["Admin"])
  @UseGuards(RolesGuard)
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes("Employee")) {
      throw new NotFoundException(
        "You don't have permission to access this resource",
      );
    }
    return this.providersService.findAll();
  }

  @Get("name/:name")
  findbyName(@Param("name") name: string) {
    return this.providersService.findOneByName(name);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const provider = await this.providersService.findOne(id);
    if (!provider) throw new NotFoundException();
    return provider;
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}
