import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from './user.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserLoginRto } from './rto/user-login.rto';
import { UserRto } from './rto/user.rto';
import { DeleteUserRto } from './rto/delete-user.rto';
import { UpdateUserRto } from './rto/update-user.rto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}
  @ApiOkResponse({
    description: 'The login',
    type: UserLoginRto,
    isArray: false,
  })
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.userService.signIn(
      signInDto.id,
      signInDto.email,
      signInDto.password,
    );
  }
  @ApiOkResponse({
    description: 'Create user',
    type: UserRto,
    isArray: false,
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @ApiOkResponse({
    description: 'The getting a user',
    type: UserRto,
    isArray: false,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({
    description: 'The deleting a user',
    type: DeleteUserRto,
    isArray: false,
  })
  @UseGuards(UserGuard)
  @Delete(':id')
  deleteUser(@Param(':id') id: number) {
    return this.userService.deleteUser(id);
  }

  @ApiOkResponse({
    description: 'The user update',
    type: UpdateUserRto,
    isArray: false,
  })
  @UseGuards(UserGuard)
  @Patch(':id')
  updateUser(@Param(':id') id: number, @Body() signInDto: UpdateUserDto) {
    return this.userService.updateUser(signInDto, id);
  }
}
