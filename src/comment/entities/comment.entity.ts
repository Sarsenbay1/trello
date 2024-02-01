import { Card } from 'src/card/entities/card.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;

  @ManyToOne(() => Card, (card) => card.comments)
  card: Card;
}
