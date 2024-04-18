import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentRto {
  @ApiProperty()
  name: string;
}
