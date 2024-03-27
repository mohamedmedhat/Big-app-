import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ROLES } from '../decorators/userRoles.decorator';
import { UserRoles } from '../enums/userRole.enum';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { CAPTCHA } from './entities/captcha.entity';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ROLES(UserRoles.USER || UserRoles.ADMIN)
  @Mutation(() => User)
  @Recaptcha()
  async SignIn(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Args('recaptchaResponse', { type: () => String })
    recaptchaResponse: string,
  ) {
    if (!recaptchaResponse) {
      throw new Error('reCAPTCHA validation failed');
    }
    return this.usersService.SignIn(email, password);
  }

  @ROLES(UserRoles.USER)
  @Mutation(() => CAPTCHA)
  async generateCapthcha() {
    const { text, data } = await this.usersService.generateCaptcha();
    return { text, data };
  }

  @ROLES(UserRoles.USER)
  @Mutation(() => CAPTCHA)
  async validateCaptcha(
    @Args('captchaId', { type: () => Number }) captchaId: number,
    @Args('inputText', { type: () => String }) inputText: string,
  ) {
    const captcha = await this.usersService.getCaptchaByID(captchaId);
    if (!captcha) {
      throw new Error('Invalid Captcha');
    }
    return captcha.text === inputText;
  }

  @ROLES(UserRoles.USER || UserRoles.ADMIN)
  @Mutation()
  async SignUp(
    @Args('createUser', { type: () => CreateUserInput })
    createuserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.SignUp(createuserInput);
  }

  @ROLES(UserRoles.ADMIN)
  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  @ROLES(UserRoles.ADMIN)
  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput', { type: () => UpdateUserInput })
    updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ROLES(UserRoles.ADMIN)
  @Query(() => [User], { name: 'findAllUsers' })
  async findAll(
    @Args('page', { type: () => Number }) page: number,
    @Args('pageSize', { type: () => Number }) pageSize: number,
  ): Promise<[User[], number]> {
    return this.usersService.findAll(page, pageSize);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ROLES(UserRoles.ADMIN)
  @Query(() => User, { name: 'findOneUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @ROLES(UserRoles.ADMIN)
  @Mutation(() => User, { name: 'deleteUser' })
  async remove(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
