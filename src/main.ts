import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cors config
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env['APP_PORT'];

  await app.listen(port, () =>
    {}
  );

  console.log(
    `App running at ${process.env.APP_HOST || 'localhost'}:${process.env.APP_PORT}`,
  );
}
bootstrap();
