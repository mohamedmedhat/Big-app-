import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateContentDto } from '../../classes/Content.dto';

export class CreateTrpcDto extends CreateContentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  pageSize: number;
}
