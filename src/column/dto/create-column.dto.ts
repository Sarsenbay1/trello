import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  title: string;
}
