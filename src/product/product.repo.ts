import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/productCategory.model';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(Product) private readonly productModel: ModelCtor<Product>) {}

  async getProducts(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async getOneProduct(id: string): Promise<Product> {
    return await this.productModel.findOne({
      where: { id },
      include: [ProductCategory],
    });
  }
}
