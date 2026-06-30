import { Controller, Get } from '@nestjs/common';
import { ProductCatalogService } from './productcatalog.service';

@Controller()
export class ProductCatalogController {
  constructor(private readonly productCatalogService: ProductCatalogService) {}

  @Get('products')
  getAllProducts() {
    return this.productCatalogService.findAllProducts();
  }
}