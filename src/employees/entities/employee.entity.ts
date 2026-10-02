import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Location } from "../../locations/entities/location.entity";
@Entity()
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  employeeId: string;

  @Column("text", {
    nullable: true,
  })
  employeeName: string;

  @Column("text", {
    nullable: true,
  })
  employeeLastName: string;

  @Column("text", {
    nullable: true,
  })
  employeePhoneNumber: string;

  @Column("text", {
    unique: true,
    nullable: true,
  })
  employeeEmail: string;

  @Column({
    type: "text",
    nullable: true,
  })
  employeePhoto: string;

  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({
    name: "locationId",
  })
  location: Location;

  @OneToOne(() => User)
  @JoinColumn({
    name: "userId",
  })
  user: User;
}
