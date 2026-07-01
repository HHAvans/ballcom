import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('support')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Klant stuurt vraag in
  @Post('tickets')
  createTicket(@Body() body: { customerId: string; subject: string; message: string }) {
    return this.appService.createTicket(body.customerId, body.subject, body.message);
  }

  // Medewerker bekijkt openstaande vragen
  @Get('tickets/open')
  getOpenTickets() {
    return this.appService.findOpenTickets();
  }

  // Medewerker beantwoordt vraag
  @Put('tickets/:id/answer')
  answerTicket(@Param('id') id: string, @Body() body: { answer: string }) {
    return this.appService.answerTicket(id, body.answer);
  }

  // R10: Synchrone query weergave (Simulatie van data inlezen uit Ordering context)
  @Get('tickets/:id/order-summary')
  getOrderSummary(@Query('orderId') orderId: string) {
    return {
      orderId,
      status: 'bestelling ontvangen',
      info: 'Order details via R10 upstream succesvol ingelezen.',
    };
  }
}