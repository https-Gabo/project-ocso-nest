import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiResponse } from "@nestjs/swagger";
import { ROLES } from "../auth/constans/roles.constans";
import { ApiAuth } from "../auth/decorators/api.decorator";
import { Auth } from "../auth/decorators/auth.decorator";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmployeesService } from "./employees.service";
import { Employee } from "./entities/employee.entity";

@ApiAuth()
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "uuid",
      employeeName: "Gabo",
      employeeEmail: "gabo@gmail.com",
      employeeLastName: "Gonzalez",
      employeePhoneNumber: "123456789",
      employeePhoto: "https://example.com/photo.jpg",
    } as Employee,
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get("/:id")
  findOne(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
  ) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get("location/:id")
  findAllLocation(@Param("id") id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(":id")
  update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
  ) {
    return this.employeesService.remove(id);
  }
}
