import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  @ApiProperty()
  title: string;
}
