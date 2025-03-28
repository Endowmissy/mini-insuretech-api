import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repo';
import logger from 'src/config/logger';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async getProducts(): Promise<any> {
    return await this.productRepository.getProducts();
  }

  async getOneProduct(id: string): Promise<any> {
    const product = await this.productRepository.getOneProduct(id);
    if (!product) {
      logger.info(`::: Product does not exist`);
      throw new NotFoundException(`Product does not exist`);
    }
    return product;
  }
}
