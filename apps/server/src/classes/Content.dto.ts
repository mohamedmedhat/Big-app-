import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export abstract class CreateContentDto {
    @ApiProperty({
        description: 'name of the product',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    firstname:string

    @ApiProperty({
        description: 'name of the product',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    lastname:string
}