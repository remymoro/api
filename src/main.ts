import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:4200'],
      credentials: true,
    },
  });


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // supprime les champs non attendus dans les DTO
      forbidNonWhitelisted: false, // si true → erreur si extra champs
      transform: true, // convertit les types (string => number)
      transformOptions: {
        enableImplicitConversion: true, // permet de convertir automatiquement
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
