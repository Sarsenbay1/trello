import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
