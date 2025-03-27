import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repo';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { WinstonModule } from 'nest-winston';
import logger from '../config/logger';
import { ProductCategory } from '../models/productCategory.model';
import { Plan } from 'src/models/plan.model';
import { PendingPolicy } from 'src/models/pendingPolicy';
import { User } from 'src/models/user.model';
import { Wallet } from 'src/models/wallet.model';
import { Policy } from 'src/models/policy.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductCategory,
      Plan,
      PendingPolicy,
      User,
      Wallet,
      Policy,
    ]),
    WinstonModule.forRoot(logger),
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
})
export class ProductModule {}
