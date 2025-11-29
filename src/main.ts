import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { AppErrorFilter } from './common/filters/app-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:4200'],
      credentials: true,
    },
  });

  // Log requests (headers are partially redacted)
  app.use(cookieParser());   // 🔥 indispensable

  // 1️⃣ Installe le filtre global d’erreurs
  app.useGlobalFilters(new AppErrorFilter());
  // 2️⃣ Installe le ValidationPipe – SYNTAXE CORRECTE
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      // Exception factory = renvoie la liste complète des ValidationError[]
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
