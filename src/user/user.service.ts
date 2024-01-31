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
    const { email, password } = createUserDto;
    const user = await this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id: id });
    console.log(user);
    return user;
  }

  async signIn(id: number, email: string, pass: string): Promise<any> {
    try {
      const user = await this.findOne(id);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email };
      return {
        MediaKeySystemAccess_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    return await this.userRepository.remove(user);
  }
  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<any> {
    const { email, password } = updateUserDto;
    const user = await this.userRepository.findOneBy({ id: id });
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }
}
