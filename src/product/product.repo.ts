import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/productCategory.model';
import { Transaction } from 'sequelize';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(Product) private readonly productModel: ModelCtor<Product>) {}

  // get all products
  async getProducts(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  // fetch single product, with their associated categories and price
  async getOneProduct(id: string, transaction?: Transaction): Promise<Product> {
    return await this.productModel.findOne({
      where: { id },
      include: [ProductCategory],
      transaction
    });
  }

}
