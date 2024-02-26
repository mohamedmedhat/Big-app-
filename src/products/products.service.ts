import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: Repository<Product>){}

  async savePhoto(filename:string, filepath:string):Promise<Product>{
    const photo = new Product();
    photo.image = filename;
    return await this.productRepository.save(photo);
  }

  async CreateProduct(createproducts: CreateProductInput):Promise<Product>{
    const newProduct = this.productRepository.create({
      ...createproducts,
    });
    return await this.productRepository.save(newProduct);
  }

  async GetAllProducts():Promise<Product[]>{
    return await this.productRepository.find();
  }

  async UpdateProduct(name:string,updateProduct:UpdateProductInput):Promise<Product>{
    const nameExist = this.productRepository.findOneBy({name});
    if(!nameExist){throw new NotFoundException()}
    const newProducts = this.productRepository.create({
      ...updateProduct,
    });
    return await this.productRepository.save(newProducts);
  }

  async DeleteProduct(name:string){
    return await this.productRepository.delete(name);
  }


}
