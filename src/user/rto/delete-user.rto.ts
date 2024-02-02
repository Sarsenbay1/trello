import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserRto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
