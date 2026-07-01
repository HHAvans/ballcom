import { Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('warehouse')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Toont alle actieve picklijsten in het magazijn
  @Get('orders')
  getAllOrders() {
    return this.appService.findAll();
  }

  // Laat een medewerker een order op status "verpakt" zetten
  @Put('orders/:id/pack')
  async packOrder(@Param('id') id: string) {
    return await this.appService.packOrder(id);
  }
}