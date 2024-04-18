import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, ColumnEntity, User, Comment]),
    UserModule,
  ],
  controllers: [CardController],
  providers: [CardService, JwtService, ConfigService],
})
export class CardModule {}
