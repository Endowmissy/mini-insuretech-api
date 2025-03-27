import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<any> {
    return await this.productRepository.getProducts();
  }

  async getOneProduct(id: string): Promise<any> {
    const product = await this.productRepository.getOneProduct(id);
    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return product;
  }
}
