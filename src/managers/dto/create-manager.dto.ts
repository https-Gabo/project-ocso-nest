import {
  IsEmail,
  IsNumber,
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
  @IsNumber()
  @IsOptional()
  location?: Partial<Location>;
}
