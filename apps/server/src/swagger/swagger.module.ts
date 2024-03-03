import { Module } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { SwaggerController } from './swagger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swagger } from './entities/product.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[
    TypeOrmModule.forFeature([Swagger]),
    BullModule.registerQueue({
      name: 'swagger',
    }),
  ],
  controllers: [SwaggerController],
  providers: [SwaggerService],
})
export class SwaggerModule {}
