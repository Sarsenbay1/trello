import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { ColumnEntity } from 'src/column/entities/column.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
  ) {}

  async createCard(createCardDto: CreateCardDto, colomnId: number) {
    const { name } = createCardDto;
    const column = await this.columnRepository.findOneBy({ id: colomnId });
    if (column) {
      const card = await this.cardRepository.create({ name, column });
      return await this.cardRepository.save(card);
    }
  }

  async findAllCards(colomnId: number) {
    const column = await this.columnRepository.findOneBy({ id: colomnId });
    return await this.cardRepository.findBy({ column: column });
  }

  async findOneCard(columnId: number) {
    const card = await this.cardRepository.findOneBy({ id: columnId });
    return card;
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto) {
    const { name } = updateCardDto;
    const card = await this.cardRepository.findOneBy({ id: id });
    card.name = name;
    return await this.cardRepository.save(card);
  }

  async removeCard(id: number) {
    const card = await this.cardRepository.findOneBy({ id: id });
    return await this.cardRepository.remove(card);
  }
}
