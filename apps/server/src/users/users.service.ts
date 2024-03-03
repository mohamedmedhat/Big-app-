import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRpository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async isEmailExist(email: string): Promise<User> {
    return this.userRpository.findOneBy({ email });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async generateAuthToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  async SignIn(email: string, password: string): Promise<string> {
    const user = await this.isEmailExist(email);
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid Credential');
    }
    return this.generateAuthToken(user);
  }

  async SignUp(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput;
    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist) {
      throw new Error('email not valid');
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = this.userRpository.create({
      ...createUserInput,
      password: hashPassword,
    });
    return this.userRpository.save(newUser);
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRpository.create(createUserInput);
    return this.userRpository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRpository.find();
  }

  findOne(id: number) {
    return this.userRpository.findOneBy({ id });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRpository.findOneBy({ id });
    if (!user) {
      return undefined;
    }
    const updatedUser = Object.assign(user, updateUserInput);
    return this.userRpository.save(updatedUser);
  }

  async remove(id: number) {
    return this.userRpository.delete(id);
  }
}
