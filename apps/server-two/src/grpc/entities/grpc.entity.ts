import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GRPC {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;

    @Column()
    desc: string;

}