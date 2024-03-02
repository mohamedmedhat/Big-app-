import { Module } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { SwaggerController } from './swagger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swagger } from './entities/product.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Swagger])
  ],
  controllers: [SwaggerController],
  providers: [SwaggerService],
})
export class SwaggerModule {}
