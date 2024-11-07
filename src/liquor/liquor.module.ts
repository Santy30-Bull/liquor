/* eslint-disable prettier/prettier */
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Liquor } from './liquor.model';
import { LiquorService } from './liquor.service';
import { LiquorController } from './liquor.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga el módulo de configuración globalmente
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('LIQUOR_DB_HOST'),
        port: configService.get<number>('LIQUOR_DB_PORT'),
        username: configService.get<string>('LIQUOR_DB_USER'),
        password: configService.get<string>('LIQUOR_DB_PASSWORD'),
        database: configService.get<string>('LIQUOR_DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([Liquor]),
    ClientsModule.registerAsync([
      {
        name: 'BOOKING_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: { servers: [configService.get<string>('NATS_SERVER_URL')] },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [LiquorController],
  providers: [LiquorService],
})
export class LiquorModule {}
