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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserGuard } from 'src/user/user.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateCommentRto } from './rto/create-comment.rto';
import { CommentRto } from './rto/comment.rto';
import { DeleteCommentRto } from './rto/delete-comment.dto';
import { PermissionsGuard } from 'src/common/permissions.guard';

@Controller('user/:userId/column/:columnId/card/:cardId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOkResponse({
    description: 'The create comment',
    type: CreateCommentRto,
    isArray: false,
  })
  @UseGuards(UserGuard, PermissionsGuard)
  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('cardId') cardId: number,
  ) {
    return this.commentService.createComment(createCommentDto, cardId);
  }

  @ApiOkResponse({
    description: 'The getting all comments',
    type: CommentRto,
    isArray: true,
  })
  @Get()
  findAllComments(@Param('cardId') cardId: number) {
    return this.commentService.findAllComment(cardId);
  }
  @ApiOkResponse({
    description: 'The getting one comment',
    type: CommentRto,
    isArray: false,
  })
  @Get(':id')
  findOneComment(@Param('id') id: string) {
    return this.commentService.findOneComment(+id);
  }

  @ApiOkResponse({
    description: 'The update comment',
    type: CommentRto,
    isArray: false,
  })
  @UseGuards(UserGuard)
  @Patch(':id')
  updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(+id, updateCommentDto);
  }

  @ApiOkResponse({
    description: 'The delete comment',
    type: DeleteCommentRto,
    isArray: false,
  })
  @UseGuards(UserGuard)
  @Delete(':id')
  removeComment(@Param('id') id: string) {
    return this.commentService.removeComment(+id);
  }
}
