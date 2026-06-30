import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { SupplierProduct } from './supplier-product.entity';
import { SupplierPublisher } from './supplier.publisher';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ProposeProductDto } from './dto/propose-product.dto';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);

  constructor(
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
    @InjectRepository(SupplierProduct)
    private readonly products: Repository<SupplierProduct>,
    private readonly publisher: SupplierPublisher,
  ) {}

  findSuppliers() {
    return this.suppliers.find();
  }

  async registerSupplier(dto: CreateSupplierDto) {
    const supplier = this.suppliers.create({
      supplierId: randomUUID(),
      name: dto.name,
      status: 'pending',
    });
    return this.suppliers.save(supplier);
  }

  async approveSupplier(supplierId: string) {
    const supplier = await this.suppliers.findOneBy({ supplierId });
    if (!supplier) throw new NotFoundException('Supplier niet gevonden');

    supplier.status = 'approved';
    await this.suppliers.save(supplier);
    await this.publisher.supplierApproved({
      supplierId: supplier.supplierId,
      name: supplier.name,
      approvedAt: new Date().toISOString(),
    });
    this.logger.log(`Supplier ${supplierId} goedgekeurd`);
    return supplier;
  }

  // Productvoorstel: alleen toegestaan als de supplier is goedgekeurd.
  async proposeProduct(supplierId: string, dto: ProposeProductDto) {
    const supplier = await this.suppliers.findOneBy({ supplierId });
    if (!supplier) throw new NotFoundException('Supplier niet gevonden');
    if (supplier.status !== 'approved') {
      throw new BadRequestException(
        'Alleen goedgekeurde suppliers mogen producten voorstellen',
      );
    }

    // productId hier genereren zodat propose en delete hetzelfde product gebruiken
    const product = this.products.create({
      productId: randomUUID(),
      supplierId,
      productName: dto.productName,
      description: dto.description,
      price: dto.price,
    });
    await this.products.save(product);

    await this.publisher.productProposed({
      productId: product.productId,
      supplierId: product.supplierId,
      productName: product.productName,
      description: product.description,
      price: product.price,
    });
    this.logger.log(
      `Product ${product.productId} voorgesteld door supplier ${supplierId}`,
    );
    return product;
  }

  async deleteProduct(productId: string) {
    const product = await this.products.findOneBy({ productId });
    if (!product) throw new NotFoundException('Product niet gevonden');

    const supplierId = product.supplierId;
    await this.products.remove(product);
    await this.publisher.productDeleted({ productId, supplierId });
    this.logger.log(`Product ${productId} verwijderd`);
    return { deleted: productId };
  }
}
