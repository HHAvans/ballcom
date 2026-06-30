import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerImportService } from './customer-import.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { ChangeAddressDto } from './dto/change-address.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly service: CustomerService,
    private readonly importService: CustomerImportService,
  ) {}

  @Get()
  list() {
    return this.service.findAll();
  }

  @Post()
  register(@Body() dto: RegisterCustomerDto) {
    return this.service.register(dto);
  }

  @Patch(':id/address')
  changeAddress(@Param('id') id: string, @Body() dto: ChangeAddressDto) {
    return this.service.changeAddress(id, dto);
  }

  // Trigger de externe CSV-import (R1). Kan nachtelijk via een cron worden aangeroepen.
  @Post('import')
  runImport() {
    return this.importService.importFromExternalSystem();
  }
}
