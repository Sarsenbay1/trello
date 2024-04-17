import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './environment-variables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const configService = app.get(ConfigService<EnvironmentVariables, true>);

  const config = new DocumentBuilder()
    .setTitle('Trello')
    .setDescription('The trello API')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get<number>('PORT') || 5000);

  console.log(`server ok PORT ${configService.get<number>('PORT') || 5000}`);
}
bootstrap();
