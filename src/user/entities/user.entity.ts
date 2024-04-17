import { Length } from 'class-validator';
import { Card } from 'src/card/entities/card.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Length(6, 302)
  @Column()
  password: string;

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}
