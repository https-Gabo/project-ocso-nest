import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Location } from "../../locations/entities/location.entity";
@Entity()
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  managerId: string;

  @Column("text", {
    nullable: true,
  })
  managerFullName: string;

  @Column("float", {
    nullable: true,
  })
  managerSalary: number;

  @Column("text", {
    unique: true,
    nullable: true,
  })
  managerEmail: string;

  @Column("text", {
    nullable: true,
  })
  managerPhoneNumber: string;

  //Relacion con locations

  @OneToOne(() => Location)
  location: Location;

  @OneToOne(() => User)
  @JoinColumn({
    name: "userId",
  })
  user: User;
}
