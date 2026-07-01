import { Injectable } from '@nestjs/common';
import { WarehousePublisher } from './warehouse.publisher';

export enum FulfilmentStatus {
  WORDT_KLAARGEMAAKT = 'Wordt klaargemaakt voor verzending',
  VERPAKT = 'verpakt',
  VERZONDEN = 'verzonden',
}

export interface FulfilmentOrder {
  id: string;
  orderId: string;
  status: FulfilmentStatus;
  products: string[];
  packedAt?: string;
}

@Injectable()
export class AppService {
  // In-memory state tracking voor snelle en foutloze oplevering
  private fulfilmentOrders = new Map<string, FulfilmentOrder>();

  constructor(private readonly publisher: WarehousePublisher) {}

  // Gestart via de RabbitMQ consumer (R8)
  createFulfilmentOrder(orderId: string, products: string[]): FulfilmentOrder {
    const fulfilment: FulfilmentOrder = {
      id: crypto.randomUUID(),
      orderId,
      status: FulfilmentStatus.WORDT_KLAARGEMAAKT, // Acceptatiecriterium
      products,
    };
    
    this.fulfilmentOrders.set(fulfilment.id, fulfilment);
    console.log(`[Warehouse] Picklijst aangemaakt voor order ${orderId}. Status: ${fulfilment.status}`);
    return fulfilment;
  }

  findAll(): FulfilmentOrder[] {
    return Array.from(this.fulfilmentOrders.values());
  }

  // Acceptatiecriterium: Handmatig packen door magazijnmedewerker via HTTP / UI
  async packOrder(id: string): Promise<FulfilmentOrder | { error: string }> {
    const fulfilment = this.fulfilmentOrders.get(id);
    if (!fulfilment) {
      return { error: 'Fulfilment order niet gevonden' };
    }

    fulfilment.status = FulfilmentStatus.VERPAKT; // Acceptatiecriterium
    fulfilment.packedAt = new Date().toISOString();

    // R9: Event verzenden naar Shipping
    await this.publisher.parcelPacked({
      parcelId: crypto.randomUUID(),
      orderId: fulfilment.orderId,
      packedAt: fulfilment.packedAt,
    });

    console.log(`[Warehouse] Order ${fulfilment.orderId} succesvol verpakt. Event R9 verzonden.`);
    return fulfilment;
  }
}