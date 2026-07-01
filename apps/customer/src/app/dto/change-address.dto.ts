import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeAddressDto {
  @IsString()
  @IsNotEmpty()
  address!: string;
}
