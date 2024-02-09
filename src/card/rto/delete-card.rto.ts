import { ApiProperty } from '@nestjs/swagger';

export class DeleteCardRto {
  @ApiProperty()
  name: string;
}
