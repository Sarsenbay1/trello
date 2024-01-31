import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    // private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // console.log('___________________\n');
    // try {
    //   user.password = createUserDto.password;
    //   user.email = createUserDto.email;
    // } catch (error) {
    //   console.log(error);
    // }
    const { email, password } = createUserDto;
    const user = await this.userRepository.create({ email, password });
    // console.log(email, password, createUserDto);
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id: id });
    return user;
  }

  async signIn(id: number, email: string, pass: string): Promise<any> {
    const user = await this.findOne(id);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      MediaKeySystemAccess_token: await this.jwtService.signAsync(payload),
    };
  }
}
