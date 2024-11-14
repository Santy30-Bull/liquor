/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { LiquorModule } from './liquor/liquor.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(LiquorModule);
  const configService = app.get(ConfigService);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(LiquorModule, {
    transport: Transport.NATS,
    options: { servers: [configService.get<string>('NATS_SERVER_URL')] },
  });

  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });

  microservice.useGlobalPipes(validationPipe);
  app.useGlobalPipes(validationPipe);

  // Escuchar en el microservicio NATS
  await microservice.listen();

  // Iniciar el servidor HTTP en el puerto configurado (puede ser 3001 u otro)
  const port = configService.get<number>('PORT'); // Usar el puerto configurado en .env
  await app.listen(port);

  // Manejar señales de terminación para ambos servicios
  process.on('SIGINT', async () => {
    await app.close();
    await microservice.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    await microservice.close();
    process.exit(0);
  });
}

bootstrap();
