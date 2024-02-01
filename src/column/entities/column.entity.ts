import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToOne(() => User, (user) => user.columns)
  user: User;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}
