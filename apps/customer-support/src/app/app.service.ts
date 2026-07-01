import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly repo: Repository<TicketEntity>,
  ) {}

  async createTicket(customerId: string, subject: string, message: string): Promise<TicketEntity> {
    const ticket = this.repo.create({ customerId, subject, message, status: 'open' });
    return await this.repo.save(ticket);
  }

  async findOpenTickets(): Promise<TicketEntity[]> {
    return await this.repo.findBy({ status: 'open' });
  }

  async answerTicket(id: string, answer: string) {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) return { error: 'Niet gevonden' };

    ticket.answer = answer;
    ticket.status = 'beantwoord';
    return await this.repo.save(ticket);
  }
}