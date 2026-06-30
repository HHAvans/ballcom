import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductPublisher } from './product.publisher';

@Injectable()
export class ProductCatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly publisher: ProductPublisher,
  ) {}

  async createProduct(supplier: any) {
    const product = this.productRepository.create({
      productId: randomUUID(),
      supplierId: supplier.supplierId,
      name: supplier.productName ?? supplier.name,
      description: supplier.description,
      price: supplier.price,
    });
    console.log(product);

    await this.productRepository.save(product);
    //submit to rabbitmq as event
    await this.publisher.productCreated(product);

    return product;
  }

  async deleteProduct(supplier: any) {
    const product = await this.productRepository.findOneBy({
      productId: supplier.productId,
      supplierId: supplier.supplierId,
    });
    if (product) {
      await this.productRepository.remove(product);
      await this.publisher.productDeleted(product);
      console.log(`Product with ID ${product.productId} deleted successfully.`);
    }
  }

  async findAllProducts() {
    return this.productRepository.find();
  }
}
