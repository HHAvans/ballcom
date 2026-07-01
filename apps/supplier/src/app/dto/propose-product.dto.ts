import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ProposeProductDto {
  @IsString()
  @IsNotEmpty()
  productName!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsPositive()
  price!: number;
}
