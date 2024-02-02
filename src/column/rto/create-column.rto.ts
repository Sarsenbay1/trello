import { ApiProperty } from '@nestjs/swagger';
import { UserRto } from 'src/user/rto/user.rto';

export class CreateColumnRto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  user: UserRto;
  id: string;
}
