import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  SupplierProductProposedEvent,
  SupplierProductDeletedEvent,
} from '@org/models';
import { Product } from './product.entity';
import { ProductPublisher } from './product.publisher';

@Injectable()
export class ProductCatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly publisher: ProductPublisher,
  ) {}

  async createProduct(event: SupplierProductProposedEvent) {
    const product = this.productRepository.create({
      productId: event.productId,
      supplierId: event.supplierId,
      name: event.productName,
      description: event.description,
      price: event.price,
    });

    await this.productRepository.save(product);
    await this.publisher.productCreated(product);

    return product;
  }

  async deleteProduct(event: SupplierProductDeletedEvent) {
    const product = await this.productRepository.findOneBy({
      productId: event.productId,
      supplierId: event.supplierId,
    });
    if (product) {
      await this.productRepository.remove(product);
      await this.publisher.productDeleted(product);
    }
  }

  async findAllProducts() {
    return this.productRepository.find();
  }
}
