/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
  Min,
  Max,
} from 'class-validator';

export class CreateLiquorDto {
  @IsString()
  @IsNotEmpty()
  readonly liquorType: string;

  @IsInt()
  @Min(1)
  readonly quantity: number;

  @IsInt()
  @Min(0)
  readonly stockLevel: number;

  @IsDateString()
  readonly orderDate: Date;

  @IsEmail()
  @IsNotEmpty()
  readonly supplierContact: string;

  @IsInt()
  @Min(0)
  readonly reorderThreshold: number;

  @IsInt()
  @Min(0)
  readonly eventServed: number; // Event ID del evento de booking
}
