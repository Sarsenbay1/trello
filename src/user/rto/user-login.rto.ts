import { ApiProperty } from '@nestjs/swagger';

export class UserLoginRto {
  @ApiProperty()
  MediaKeySystemAccess_token: string;
}
