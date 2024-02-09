import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserRto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  password: string;
  @ApiPropertyOptional()
  email: string;
}
