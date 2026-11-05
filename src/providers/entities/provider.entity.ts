import type { Relation } from "typeorm";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { Product } from "../../products/entities/product.entity";
@Entity()
export class Provider {
  @PrimaryGeneratedColumn("uuid")
  providerId: string;

  @Column("text")
  providerName: string;

  @Column("text", {
    unique: true,
  })
  providerEmail: string;

  @Column({
    type: "text",
    nullable: true,
  })
  providerPhoneNumber: string;

  @OneToMany("Product", "provider")
  products: Relation<Product[]>;
}
