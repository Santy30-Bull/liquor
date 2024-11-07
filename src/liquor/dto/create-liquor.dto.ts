/* eslint-disable prettier/prettier */
export class CreateLiquorDto {
  readonly liquorType: string;
  readonly quantity: number;
  readonly stockLevel: number;
  readonly orderDate: Date;
  readonly supplierContact: string;
  readonly reorderThreshold: number;
  readonly eventServed: number; // Event ID del evento de booking
}
