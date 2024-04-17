import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { ColumnEntity } from './column/entities/column.entity';
import { Card } from './card/entities/card.entity';
import { Comment } from './comment/entities/comment.entity';
import { plainToInstance } from 'class-transformer';
import { EnvironmentVariables } from './environment-variables';
import { validateSync } from 'class-validator';
import { PermissionsGuard } from './common/permissions.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: (rawConfig) => {
        const config = plainToInstance(EnvironmentVariables, rawConfig, {
          enableImplicitConversion: true,
        });

        const errors = validateSync(config);
        if (errors.length > 0) {
          throw new Error(errors.toString());
        }
        return config;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        database: configService.get<string>('POSTGRES_DB'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        entities: [User, ColumnEntity, Card, Comment],
        synchronize:
          configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ColumnModule,
    CardModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserModule],
})
export class AppModule {
  constructor(
    private configService: ConfigService<EnvironmentVariables, true>,
  ) {
    console.log(
      `DB work to PORT ${configService.get<number>('POSTGRES_PORT')}`,
    );
  }
}
