import { PartialType } from '@nestjs/mapped-types';
import { CreateSwaggerDto } from './create-product.dto';

export class UpdateSwaggerDto extends PartialType(CreateSwaggerDto) {}
