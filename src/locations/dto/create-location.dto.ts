import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @MaxLength(50)
  locationName: string;
  @IsString()
  @MaxLength(160)
  locationAddress: string;
  @IsArray()
  @ArrayNotEmpty()
  locationLatLng: number[];
}
