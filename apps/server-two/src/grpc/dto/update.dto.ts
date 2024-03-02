import { IsNotEmpty, IsString } from 'class-validator';

export class UpdategRPCDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;
}
