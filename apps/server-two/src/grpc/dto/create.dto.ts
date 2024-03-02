import { IsNotEmpty, IsString } from 'class-validator';

export class CreategRPCDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;
}
