import { ApiProperty } from "@nestjs/swagger";
import type { Relation } from "typeorm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Employee } from "../../employees/entities/employee.entity";
import type { Manager } from "../../managers/entities/manager.entity";
import type { Region } from "../../regions/entities/region.entity";

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

  @OneToOne("Manager", {
    eager: true,
  })
  @JoinColumn({
    name: "managerId",
  })
  manager: Relation<Manager> | string;

  @ManyToOne("Region", "locations")
  @JoinColumn({
    name: "regionId",
  })
  region: Relation<Region>;

  @OneToMany("Employee", "location")
  employees: Relation<Employee[]>;
}
