import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import type { Location } from "../../locations/entities/location.entity";

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  employeeName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(70)
  employeeLastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  employeeEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  location: Location;
}
