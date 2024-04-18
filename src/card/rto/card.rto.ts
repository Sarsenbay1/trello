import { ApiProperty } from '@nestjs/swagger';

export class CardRto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
