import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';
import { CustomerPublisher } from './customer.publisher';
import { ExternalCustomerAcl } from './external-customer.acl';

@Injectable()
export class CustomerImportService {
  private readonly logger = new Logger(CustomerImportService.name);
  private readonly acl = new ExternalCustomerAcl();

  constructor(
    @InjectRepository(CustomerProfile)
    private readonly profiles: Repository<CustomerProfile>,
    private readonly publisher: CustomerPublisher,
  ) {}

  // Haalt het externe klantbestand op en importeert het.
  async importFromExternalSystem() {
    const url = process.env.CUSTOMER_IMPORT_URL;
    if (!url) throw new Error('CUSTOMER_IMPORT_URL ontbreekt');

    const { data } = await axios.get<string>(url, { responseType: 'text' });
    const rows = this.acl.parseCsv(data);

    let imported = 0;
    for (const row of rows) {
      const mapped = this.acl.toCustomerProfile(row);

      // bestaat dit record al? dan bijwerken, anders nieuw aanmaken (geen duplicaten)
      let profile = await this.profiles.findOneBy({
        externalRef: mapped.externalRef,
      });
      if (!profile) {
        profile = this.profiles.create({
          customerId: randomUUID(),
          name: mapped.name,
          address: mapped.address,
          externalRef: mapped.externalRef,
          source: 'external-csv',
        });
      } else {
        profile.name = mapped.name;
        profile.address = mapped.address;
      }
      await this.profiles.save(profile);

      await this.publisher.customerProfileImported({
        customerId: profile.customerId,
        name: profile.name,
        address: profile.address ?? '',
        source: 'external-csv',
      });
      imported++;
    }

    this.logger.log(`Import klaar: ${imported} profielen verwerkt`);
    return { imported };
  }
}
