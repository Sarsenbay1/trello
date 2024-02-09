import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Card } from 'src/card/entities/card.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}
  async createComment(createCommentDto: CreateCommentDto, cardId: number) {
    const { content } = createCommentDto;
    const card = await this.cardRepository.findOneBy({ id: cardId });
    if (card) {
      const comment = await this.commentRepository.create({ content, card });
      return await this.commentRepository.save(comment);
    }
  }

  async findAllComment(cardId: number) {
    const card = await this.cardRepository.findOneBy({ id: cardId });
    return await this.commentRepository.findBy({ card: card });
  }

  async findOneComment(cardId: number) {
    const comment = await this.commentRepository.findOneBy({ id: cardId });
    return comment;
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;
    const comment = await this.commentRepository.findOneBy({ id: id });
    comment.content = content;
    return await this.commentRepository.save(comment);
  }

  async removeComment(id: number) {
    const comment = await this.commentRepository.findOneBy({ id: id });
    return await this.commentRepository.remove(comment);
  }
}
