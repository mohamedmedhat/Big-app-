import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsPagination } from './entities/productspagination';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(@UploadedFile() file): Promise<Product> {
    return await this.productsService.savePhoto(file.filename, file.path);
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async AddProducts(
    @Args('CreateProductInput', { type: () => CreateProductInput })
    CreateProductInput: CreateProductInput,
  ) {
    return await this.productsService.CreateProduct(CreateProductInput);
  }

  @Query(() => ProductsPagination, { name: 'getallProducts' })
  async GetAllProducts(
    @Args('page', { type: () => Int }) page: number,
    @Args('pageSize', { type: () => Int }) pageSize: number,
  ): Promise<ProductsPagination> {
    const [products, totalproducts] = await this.productsService.GetAllProducts(
      page,
      pageSize,
    );
    return { products, totalproducts };
  }

  @Mutation(() => Product, { name: 'deleteProduct' })
  async DeleteProduct(@Args('name', { type: () => String }) name: string) {
    return await this.productsService.DeleteProduct(name);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  async UpdateProduct(
    @Args('name', { type: () => String }) name: string,
    @Args('updateProductInput', { type: () => UpdateProductInput })
    updateProductInput: UpdateProductInput,
  ) {
    return await this.productsService.UpdateProduct(name, updateProductInput);
  }
}
