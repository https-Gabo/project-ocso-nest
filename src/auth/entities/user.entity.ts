import type { Relation } from "typeorm";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Employee } from "../../employees/entities/employee.entity";
import type { Manager } from "../../managers/entities/manager.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;
  @Column("text", {
    unique: true,
  })
  userEmail: string;
  @Column("text")
  userPassword: string;
  @Column("simple-array", {
    default: "Employee",
  })
  userRoles: string[];
  @OneToOne("Manager")
  manager: Relation<Manager>;

  @OneToOne("Employee")
  employee: Relation<Employee>;
}
