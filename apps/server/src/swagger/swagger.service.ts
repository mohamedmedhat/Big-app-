import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Swagger } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateSwaggerDto } from './dto/create-product.dto';
import { UpdateSwaggerDto } from './dto/update-product.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SwaggerService {
  constructor(
    @InjectRepository(Swagger) private readonly productRepository:Repository<Swagger>,
    @InjectQueue('swagger') private readonly _swaggerQueue: Queue,
    ){}

  async create(createProductDto: CreateSwaggerDto):Promise<Swagger> {
   const user = this.productRepository.create({
    ...createProductDto
   });
   return this.productRepository.save(user);
  }

  async findAll(): Promise<Swagger[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Swagger> {
    const product = await this.productRepository.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateSwaggerDto) {
    const product = await this.findOne(id);
    const updatedProduct = Object.assign(product, updateProductDto);
    return this.productRepository.save(updatedProduct);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
