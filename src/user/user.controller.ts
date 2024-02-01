import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from './user.guard';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.userService.signIn(
      signInDto.id,
      signInDto.email,
      signInDto.password,
    );
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @UseGuards(UserGuard)
  @Delete(':id')
  deleteUser(@Param(':id') id: number) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(UserGuard)
  @Put(':id')
  updateUser(@Param(':id') id: number, @Body() signInDto: UpdateUserDto) {
    return this.userService.updateUser(signInDto, id);
  }
  // Columns
}
