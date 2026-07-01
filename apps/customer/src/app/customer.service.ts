import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';
import { CustomerPublisher } from './customer.publisher';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { ChangeAddressDto } from './dto/change-address.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(CustomerProfile)
    private readonly profiles: Repository<CustomerProfile>,
    private readonly publisher: CustomerPublisher,
  ) {}

  findAll() {
    return this.profiles.find();
  }

  async register(dto: RegisterCustomerDto) {
    const profile = this.profiles.create({
      customerId: randomUUID(),
      name: dto.name,
      email: dto.email,
      address: dto.address,
      source: 'manual',
    });
    await this.profiles.save(profile);
    await this.publisher.customerRegistered({
      customerId: profile.customerId,
      name: profile.name,
      email: dto.email,
    });
    this.logger.log(`Klant ${profile.customerId} geregistreerd`);
    return profile;
  }

  async changeAddress(customerId: string, dto: ChangeAddressDto) {
    const profile = await this.profiles.findOneBy({ customerId });
    if (!profile) throw new NotFoundException('Klant niet gevonden');

    profile.address = dto.address;
    await this.profiles.save(profile);
    await this.publisher.customerAddressChanged({
      customerId,
      address: dto.address,
    });
    return profile;
  }
}
