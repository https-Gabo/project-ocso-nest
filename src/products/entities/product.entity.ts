import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

        productId: string; 
        productName: string;
        price: number;
        countSeal: number;
        provider: string;  
}
