import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Env } from './shared/enums/env.enum';
import { InternalServerErrorExceptionFilter } from './filters/internal-server-error.filter';
import { QueryFailedExceptionFilter } from './filters/typeorm-error.filter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(
    new InternalServerErrorExceptionFilter(),
    new QueryFailedExceptionFilter(),
  );

  if (configService.get<string>('NODE_ENV') === Env.DEV) {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
