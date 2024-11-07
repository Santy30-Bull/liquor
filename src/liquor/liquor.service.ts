/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Liquor } from './liquor.model';
import { ClientProxy } from '@nestjs/microservices';
import { CreateLiquorDto } from './dto/create-liquor.dto';
import { UpdateLiquorDto } from './dto/update-liquor.dto';

@Injectable()
export class LiquorService {
  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingClient: ClientProxy, // Cliente NATS
    @InjectModel(Liquor) private readonly liquorModel: typeof Liquor, // Modelo de base de datos
  ) {}

  async create(createLiquorDto: CreateLiquorDto) {
    // Convertir el DTO a un tipo compatible con Sequelize
    const liquor = await this.liquorModel.create(createLiquorDto as any); // Especificamos `as any` o `(createLiquorDto as typeof Liquor)`

    // Enviar notificación al servicio de Booking
    await this.notifyBookingService({ event: 'liquor_created', data: liquor });
    return liquor;
  }

  async findOne(id: number) {
    return this.liquorModel.findByPk(id);
  }

  async update(id: number, updateLiquorDto: UpdateLiquorDto) {
    const [affectedRows, [updatedLiquor]] = await this.liquorModel.update(
      updateLiquorDto,
      { where: { orderId: id }, returning: true },
    );
    if (affectedRows === 0) throw new Error('Order not found');

    await this.notifyBookingService({
      event: 'liquor_updated',
      data: updatedLiquor,
    });
    return updatedLiquor;
  }

  async updateStock(orderId: number, quantity: number) {
    const liquor = await this.liquorModel.findByPk(orderId);
    if (!liquor) throw new Error('Order not found');

    // Reducir el nivel de stock
    liquor.stockLevel -= quantity;
    await liquor.save();

    // Si el inventario está bajo, notificar al servicio de Booking
    if (liquor.stockLevel <= liquor.reorderThreshold) {
      this.bookingClient.emit('liquor.lowStock', {
        liquorType: liquor.liquorType,
        stockLevel: liquor.stockLevel,
      });
    }
  }

  async remove(id: number) {
    const deleted = await this.liquorModel.destroy({ where: { orderId: id } });
    if (!deleted) throw new Error('Order not found');
    await this.notifyBookingService({ event: 'liquor_deleted', data: { id } });
  }

  async notifyBookingService(data: any) {
    // Enviar evento al servicio de Booking
    return this.bookingClient.emit('liquor_update', data);
  }
}
