import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateContentDto } from '../../classes/Content.dto';

export class CreateSwaggerDto extends CreateContentDto {
  @ApiProperty({
    description: 'price of the product',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
