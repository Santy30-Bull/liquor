/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Liquor } from './liquor.model';
import { ClientProxy } from '@nestjs/microservices';
import { CreateLiquorDto } from './dto/create-liquor.dto';
import { UpdateLiquorDto } from './dto/update-liquor.dto';

@Injectable()
export class LiquorService {
  private readonly logger = new Logger(LiquorService.name);

  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingClient: ClientProxy, // Cliente NATS
    @InjectModel(Liquor) private readonly liquorModel: typeof Liquor, // Modelo de base de datos
  ) {}

  async create(createLiquorDto: CreateLiquorDto) {
    const liquor = await this.liquorModel.create(createLiquorDto as any);

    // Verificar si la cantidad solicitada es mayor que el stock disponible
    if (createLiquorDto.quantity > liquor.stockLevel) {
      // Lanzar un error de tipo BadRequestException si el stock no es suficiente
      const message = `Insufficient stock! Requested quantity: ${createLiquorDto.quantity}, Available stock: ${liquor.stockLevel}`;
      this.logger.warn(message);
      throw new BadRequestException(message); // Rechaza la petición con un mensaje de error
    } else {
      // Si el stock es suficiente, enviar una notificación a Booking
      const notificationMessage = {
        event: 'liquor_created',
        data: {
          message: `Order created! Check the new liquor order.`,
        },
      };

      // Enviar el mensaje al servicio de Booking usando NATS
      await this.bookingClient.emit('liquor_created_event', notificationMessage);
      this.logger.log('Liquor created and notification sent to Booking service');
    }

    return liquor;
  }

  async findOne(id: number) {
    return this.liquorModel.findByPk(id);
  }

  async findAll() {
    return this.liquorModel.findAll();
  }

  async update(id: number, updateLiquorDto: UpdateLiquorDto) {
    const [affectedRows, [updatedLiquor]] = await this.liquorModel.update(
      updateLiquorDto,
      { where: { orderId: id }, returning: true },
    );
    if (affectedRows === 0) throw new Error('Order not found');

    const notificationMessage = {
      event: 'liquor_updated',
      data: {
        message: `Liquor order updated. Please review the changes.`,
      },
    };

    // Enviar el mensaje al servicio de Booking
    await this.bookingClient.emit('liquor_updated_event', notificationMessage);
    this.logger.log('Liquor updated and notification sent to Booking service');

    return updatedLiquor;
  }

  async remove(id: number) {
    const deleted = await this.liquorModel.destroy({ where: { orderId: id } });
    if (!deleted) throw new Error('Order not found');
    
    const notificationMessage = {
      event: 'liquor_deleted',
      data: {
        message: `Liquor order with ID ${id} deleted.`,
      },
    };

    // Enviar el mensaje al servicio de Booking
    await this.bookingClient.emit('liquor_deleted_event', notificationMessage);
    this.logger.log(`Liquor with ID ${id} deleted and notification sent to Booking service`);
  }
}
