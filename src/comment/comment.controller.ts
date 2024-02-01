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

@Controller('user/:userId/column/:columnId/card/:cardId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(UserGuard)
  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('cardId') cardId: number,
  ) {
    return this.commentService.createComment(createCommentDto, cardId);
  }

  @Get()
  findAllComments(@Param('cardId') cardId: number) {
    return this.commentService.findAllComment(cardId);
  }

  @Get(':id')
  findOneComment(@Param('id') id: string) {
    return this.commentService.findOneComment(+id);
  }
  @UseGuards(UserGuard)
  @Patch(':id')
  updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(+id, updateCommentDto);
  }
  @UseGuards(UserGuard)
  @Delete(':id')
  removeComment(@Param('id') id: string) {
    return this.commentService.removeComment(+id);
  }
}
