import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateSwaggerDto {
    @ApiProperty({
        description: 'name of the product',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({
        description:'price of the product',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    price:number
}
