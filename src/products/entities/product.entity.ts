import type { Relation } from "typeorm";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Provider } from "../../providers/entities/provider.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId: string;
  @Column({ type: "text" })
  productName: string;
  @Column({ type: "float" })
  price: number;
  @Column({ type: "int" })
  countSeal: number;
  @ManyToOne("Provider", "products")
  @JoinColumn({
    name: "providerId",
  })
  provider: Relation<Provider>;
}
