import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRpository: Repository<User>){}

  async create(createUserInput: CreateUserInput):Promise<User>{
    const user = await this.userRpository.create(createUserInput);
    return this.userRpository.save(user);
  }
  

  findAll(): Promise<User[]> {
    return this.userRpository.find();
  }

  findOne(id: number){
    return this.userRpository.findOneBy({id});
  }

  async update(id: number, updateUserInput: UpdateUserInput):Promise<User> {
    const user = await this.userRpository.findOneBy({id});
    if(user){
      return this.userRpository.save({...user,...updateUserInput})
    }

  }

  async remove(id: number) {
    return this.userRpository.delete(id);
  }
}
