import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;
  @Column("text")
  userEmail: string;
  @Column("text")
  userPassword: string;
}
