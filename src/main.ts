/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { LiquorModule } from './liquor/liquor.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  // Crear la app como microservicio para NATS
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LiquorModule,
    {
      transport: Transport.NATS,
      options: { servers: ['nats://localhost:4222'] },
    },
  );
  app.listen();

  // Crear la app como servidor HTTP para el API REST
  const httpApp = await NestFactory.create(LiquorModule);
  httpApp.setGlobalPrefix('api'); // Opcional, para organizar rutas
  await httpApp.listen(3001); // Cambia 3001 si quieres otro puerto
}

bootstrap();
