/* eslint-disable prettier/prettier */
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Liquor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @Column
  liquorType: string;

  @Column
  quantity: number;

  @Column
  stockLevel: number;

  @Column
  orderDate: Date;

  @Column
  supplierContact: string;

  @Column
  reorderThreshold: number;

  @Column
  eventServed: number;
}
