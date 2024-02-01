import { Length } from 'class-validator';
import { ColumnEntity } from 'src/column/entities/column.entity';
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
}
