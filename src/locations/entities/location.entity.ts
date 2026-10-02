import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "../../employees/entities/employee.entity";
import { Manager } from "../../managers/entities/manager.entity";
import { Region } from "../../regions/entities/region.entity";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId: number;

  @ApiProperty({
    default: "Ocso Juriyork",
  })
  @Column("text")
  locationName: string;

  @ApiProperty({
    default: "123 Main St",
  })
  @Column("text")
  locationAddress: string;

  @ApiProperty({
    default: [40.7128, -74.006],
  })
  @Column("simple-array")
  locationLatLng: number[];

  @OneToOne(() => Manager, {
    eager: true,
  })
  @JoinColumn({
    name: "managerId",
  })
  manager: Manager;

  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({
    name: "regionId",
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
