import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ApiBody } from '@nestjs/swagger';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(()=> User)
  async SignIn(@Args('email') email:string,@Args('password') password:string){
    return this.usersService.SignIn(email,password);
  }

  @Mutation()
  async SignUp(@Args('createUser') createuserInput:CreateUserInput):Promise<User>{
    return this.usersService.SignUp(createuserInput);
  }

  @Mutation(() => User,{name: 'createUser'})
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User, {name: 'updateUser'})
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Query(()=> [User],{name:'findAllUsers'})
  async findAll(){
    return this.usersService.findAll();
  }

  @Query(()=>User,{name: 'findOneUser'})
  async findOne(@Args('id',{type: ()=> Int}) id:number){
    return this.usersService.findOne(id)
  }create

  @Mutation(()=>User,{name: 'deleteUser'})
  async remove(@Args('id',{type: ()=> Int}) id:number){
    return this.usersService.remove(id);
  }
}
