import type { Relation } from "typeorm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { User } from "../../auth/entities/user.entity";
import type { Location } from "../../locations/entities/location.entity";
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

  @ManyToOne("Location", "employees")
  @JoinColumn({
    name: "locationId",
  })
  location: Relation<Location>;

  @OneToOne("User")
  @JoinColumn({
    name: "userId",
  })
  user: Relation<User>;
}
