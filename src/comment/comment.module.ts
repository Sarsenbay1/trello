import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ColumnEntity } from 'src/column/entities/column.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Comment, User, ColumnEntity]),
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, JwtService, ConfigService],
})
export class CommentModule {}
