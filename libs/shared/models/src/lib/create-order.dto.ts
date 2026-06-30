import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  customerId!: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress!: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

}