import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Provider } from "../../providers/entities/provider.entity";

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
  @ManyToOne((ea) => Provider, (provider) => provider.products)
  @JoinColumn({
    name: "providerId",
  })
  provider: Provider;
}
