import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { CreateSwaggerDto } from './dto/create-product.dto';
import { UpdateSwaggerDto } from './dto/update-product.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Swagger} from './entities/product.entity';

@ApiHeader({
  name:'X-productsHeader',
  description: 'product header',
})

@ApiTags('products')
@Controller('products')
export class SwaggerController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @ApiBody({type: [CreateSwaggerDto]})
  @Post('create')
  @ApiResponse({status:201,description:'product created successfully',type:Swagger})
  @ApiResponse({status:403,description:'Forbidden'})
  create(@Body() createProductDto: CreateSwaggerDto) {
    return this.swaggerService.create(createProductDto);
  }

  @CacheKey('custom_key')
  @CacheTTL(20)
  @Get()
  findAll() {
    return this.swaggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.swaggerService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateSwaggerDto) {
    return this.swaggerService.update(+id, updateProductDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.swaggerService.remove(+id);
  }
}
