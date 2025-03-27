import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { okResponseFormat } from '../utils/responses';
import logger from '../config/logger';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    logger.info(`::: Fetching Products .........`);
    const products = await this.productService.getProducts();
    logger.info(`::: Products fetched successfully`);
    return okResponseFormat('Products fetched successfully', products);
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    logger.info(`::: Fetching Product with ID: ${id} .........`);
    const product = await this.productService.getOneProduct(id);
    logger.info(`::: Product with ID: ${id} fetched successfully`);
    return okResponseFormat('Product fetched successfully', product);
  }
}
