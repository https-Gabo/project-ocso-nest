import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Location } from "../../locations/entities/location.entity";

export class CreateManagerDto {
  @IsString()
  @MaxLength(50)
  managerFullName: string;
  @IsString()
  @IsEmail()
  managerEmail: string;
  @IsNumber()
  managerSalary: number;
  @IsString()
  @MaxLength(20)
  managerPhoneNumber: string;
  @IsObject()
  @IsOptional()
  location?: Partial<Location>;
}
