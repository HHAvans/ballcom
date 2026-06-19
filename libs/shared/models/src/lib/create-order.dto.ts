import {
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  customerId!: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress!: string;

}