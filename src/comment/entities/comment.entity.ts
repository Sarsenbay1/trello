import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  content: string;

  @ManyToOne(() => Card, (card) => card.comments)
  card: Card;
}
