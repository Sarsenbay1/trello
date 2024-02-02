import { ApiProperty } from '@nestjs/swagger';
import { ColumnRto } from 'src/column/rto/column.rto';

export class CreateCardRto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  column: ColumnRto;

  @ApiProperty()
  id: number;
}
