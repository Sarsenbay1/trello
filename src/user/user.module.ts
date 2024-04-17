import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Comment } from 'src/comment/entities/comment.entity';
import { Card } from 'src/card/entities/card.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { EnvironmentVariables } from 'src/environment-variables';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, ColumnEntity, Card, Comment]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], //
})
export class UserModule {}
