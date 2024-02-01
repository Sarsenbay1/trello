import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string;
}
