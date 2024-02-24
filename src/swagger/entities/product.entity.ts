import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Swagger {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    price: number

    @ApiProperty()
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date
}
