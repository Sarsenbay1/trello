import { ApiProperty } from '@nestjs/swagger';

export class UserRto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  id: string;
}
