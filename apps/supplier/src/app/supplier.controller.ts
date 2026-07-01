import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ProposeProductDto } from './dto/propose-product.dto';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly service: SupplierService) {}

  @Get()
  list() {
    return this.service.findSuppliers();
  }

  @Post()
  register(@Body() dto: CreateSupplierDto) {
    return this.service.registerSupplier(dto);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string) {
    return this.service.approveSupplier(id);
  }

  @Post(':id/products')
  propose(@Param('id') id: string, @Body() dto: ProposeProductDto) {
    return this.service.proposeProduct(id, dto);
  }

  @Delete('products/:productId')
  remove(@Param('productId') productId: string) {
    return this.service.deleteProduct(productId);
  }
}
