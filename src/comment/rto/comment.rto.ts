import { ApiProperty } from '@nestjs/swagger';

export class CommentRto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
