import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UserGuard } from 'src/user/user.guard';

@Controller('user/:userId/column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}
  @UseGuards(UserGuard)
  @Post()
  create(
    @Body() createColumnDto: CreateColumnDto,
    @Param('userId') userId: number,
  ) {
    return this.columnService.createColumn(createColumnDto, userId);
  }

  @Get()
  findAll(@Param('userId') userId: number) {
    return this.columnService.findAllColumn(userId);
  }

  @Get(':id')
  findOneColumn(@Param('id') id: number) {
    return this.columnService.findOneColumn(id);
  }
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.updateColumn(id, updateColumnDto);
  }
  @UseGuards(UserGuard)
  @Delete(':id')
  removeColumn(@Param('id') id: number) {
    return this.columnService.removeColumn(id);
  }
}
