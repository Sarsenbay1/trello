import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hash = await bcrypt.hash(password, 3);

    const user = await this.userRepository.create({ email, password: hash });
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id: id });
    // console.log(user);
    return user;
  }

  async signIn(email: string, pass: string): Promise<any> {
    try {
      console.log(email);
      const user = await this.userRepository.findOneBy({ email });
      console.log(await bcrypt.compare(pass, user.password));
      if (!(await bcrypt.compare(pass, user.password))) {
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

  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<any> {
    const { email, password } = updateUserDto;
    const hash = await bcrypt.hash(password, 3);
    const user = await this.userRepository.findOneBy({ id: id });
    user.email = email;
    user.password = hash;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    return await this.userRepository.remove(user);
  }
}
