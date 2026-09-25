import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";

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
}
