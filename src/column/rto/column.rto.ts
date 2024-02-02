import { ApiProperty } from '@nestjs/swagger';

export class ColumnRto {
  // Получить колонки пользователя
  @ApiProperty()
  id: number;
  title: string;
}
