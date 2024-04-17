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
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateColumnRto } from './rto/create-column.rto';
import { ColumnRto } from './rto/column.rto';
import { DeleteColumnRto } from './rto/delete-column.rto';
import { PermissionsGuard } from 'src/common/permissions.guard';

@Controller('user/:userId/column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiOkResponse({
    description: 'The create column',
    type: CreateColumnRto,
    isArray: false,
  })
  @UseGuards(UserGuard, PermissionsGuard)
  @Post()
  createColumn(
    @Body() createColumnDto: CreateColumnDto,
    @Param('userId') userId: number,
  ) {
    return this.columnService.createColumn(createColumnDto, userId);
  }
  @ApiOkResponse({
    description: 'The getting all columns',
    type: ColumnRto,
    isArray: true,
  })
  @Get()
  findAll(@Param('userId') userId: number) {
    return this.columnService.findAllColumn(userId);
  }

  @ApiOkResponse({
    description: 'The getting column',
    type: ColumnRto,
    isArray: false,
  })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOneColumn(@Param('id') id: number) {
    return this.columnService.findOneColumn(id);
  }

  @ApiOkResponse({
    description: 'The update column',
    type: ColumnRto,
    isArray: false,
  })
  @UseGuards(UserGuard, PermissionsGuard)
  @Patch(':id')
  updateColumn(
    @Param('id') id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnService.updateColumn(id, updateColumnDto);
  }

  @ApiOkResponse({
    description: 'The delete column',
    type: DeleteColumnRto,
    isArray: false,
  })
  @UseGuards(UserGuard, PermissionsGuard)
  @Delete(':id')
  removeColumn(@Param('id') id: number) {
    return this.columnService.removeColumn(id);
  }
}
