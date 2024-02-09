import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, ColumnEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
