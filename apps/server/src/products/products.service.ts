import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { validate } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectQueue('products') private readonly _productsQueue: Queue,
    private readonly productRepository: Repository<Product>,
  ) {}

  async savePhoto(filename: string, filepath: string): Promise<Product> {
    const photo = new Product();
    photo.image = filename;
    const photoError = await validate(photo);
    if (photoError.length > 0) {
      throw new Error('Validation Failed! ');
    } else {
      return await this.productRepository.save(photo);
    }
  }

  async CreateProduct(createproducts: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...createproducts,
    });
    const productError = await validate(newProduct);
    if (productError.length > 0) {
      throw new Error('Validation Failed! ');
    } else {
      return await this.productRepository.save(newProduct);
    }
  }

  async GetAllProducts(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<[Product[], number]> {
    return await this.productRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async UpdateProduct(
    name: string,
    updateProduct: UpdateProductInput,
  ): Promise<Product> {
    const nameExist = this.productRepository.findOneBy({ name });
    if (!nameExist) {
      throw new NotFoundException();
    }
    const newProducts = this.productRepository.create({
      ...updateProduct,
    });
    const productError = await validate(newProducts);
    if (productError.length > 0) {
      throw new Error('Validation Failed! ');
    } else {
      return await this.productRepository.save(newProducts);
    }
  }

  async DeleteProduct(name: string) {
    return await this.productRepository.softDelete(name);
  }
}
