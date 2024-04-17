import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Card } from 'src/card/entities/card.entity';
import { PermissionsGuard } from 'src/common/permissions.guard';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ColumnEntity, User, Card, Comment]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService, JwtService, ConfigService],
})
export class ColumnModule {}
