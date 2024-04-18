import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createColumn(createColumnDto: CreateColumnDto, userId: number) {
    const { title } = createColumnDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      const column = this.columnRepository.create({ title, user });
      return this.columnRepository.save(column);
    }
  }

  async findAllColumn(userId: number): Promise<ColumnEntity[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const column = await this.columnRepository.findBy({ user: user });
    return column;
  }

  async findOneColumn(id: number) {
    const column = await this.columnRepository.findOneBy({ id: id });
    if (column) {
      return column;
    }
  }

  async updateColumn(id: number, updateColumnDto: UpdateColumnDto) {
    const { title } = updateColumnDto;
    const column = await this.columnRepository.findOneBy({ id: id });
    column.title = title;
    return await this.columnRepository.save(column);
  }

  async removeColumn(id: number) {
    const column = await this.columnRepository.findOneBy({ id: id });
    return await this.columnRepository.remove(column);
  }
}
