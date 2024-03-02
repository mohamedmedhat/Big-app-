import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ROLES } from 'src/decorators/userRoles.decorator';
import { UserRoles } from 'src/enums/userRole.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ROLES(UserRoles.USER || UserRoles.ADMIN)
  @Mutation(()=> User)
  async SignIn(@Args('email') email:string,@Args('password') password:string){
    return this.usersService.SignIn(email,password);
  }

  @ROLES(UserRoles.USER || UserRoles.ADMIN)
  @Mutation()
  async SignUp(@Args('createUser') createuserInput:CreateUserInput):Promise<User>{
    return this.usersService.SignUp(createuserInput);
  }

  @ROLES(UserRoles.ADMIN)
  @Mutation(() => User,{name: 'createUser'})
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @ROLES(UserRoles.ADMIN)
  @Mutation(() => User, {name: 'updateUser'})
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @ROLES(UserRoles.ADMIN)
  @Query(()=> [User],{name:'findAllUsers'})
  async findAll(){
    return this.usersService.findAll();
  }

  @ROLES(UserRoles.ADMIN)
  @Query(()=>User,{name: 'findOneUser'})
  async findOne(@Args('id',{type: ()=> Int}) id:number){
    return this.usersService.findOne(id)
  }

  @ROLES(UserRoles.ADMIN)
  @Mutation(()=>User,{name: 'deleteUser'})
  async remove(@Args('id',{type: ()=> Int}) id:number){
    return this.usersService.remove(id);
  }
}
