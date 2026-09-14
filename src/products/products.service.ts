import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){
}

private products : CreateProductDto[]=[
    {
      productId: uuid(), 
      productName: "Sabritas normal", 
      price: 29,
      countSeal: 3, 
      provider: uuid(), 

    }, 
    {
      productId: uuid(), 
      productName: "Coca cola normal", 
      price: 34,
      countSeal: 2, 
      provider: uuid(), 

    }, 
    {
      productId: uuid(), 
      productName: "Jabon", 
      price: 39,
      countSeal: 5, 
      provider: uuid(), 

    }
  ]

  create(createProductDto: CreateProductDto) {
    const product= this.productRepository.save(createProductDto)
    return product; 
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,         
    })
    if(!product) throw new NotFoundException()
    return product;

  }


  findByProvider(id: string){
    const productsFound= this.products.filter((product)=>product.provider === id)
        if(!productsFound) throw new NotFoundException()
        return productsFound; 
  }


  async update(id: string, updateProductDto: UpdateProductDto) {
    const producToUpdate = await this.productRepository.preload({
      productId: id, 
      ...updateProductDto  
    })
    if (!producToUpdate) throw new NotFoundException()
    this.productRepository.save(producToUpdate)
    return producToUpdate;
  }

  remove(id: string) {
    this.findOne(id)
    this.productRepository.delete(
      {
        productId: id
      }
    )
    return {
      message: `Objeto con id ${id} eliminado`
    }
  }
}