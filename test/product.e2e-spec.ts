import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from '../src/product/product.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from '../src/config/database.config';
import { Product } from '../src/models/product.model';
import { ProductCategory } from '../src/models/productCategory.model';
import { Plan } from '../src/models/plan.model';
import { PendingPolicy } from '../src/models/pendingPolicy.model';
import { User } from '../src/models/user.model';
import { Wallet } from '../src/models/wallet.model';
import { Policy } from '../src/models/policy.model';
import { ProductService } from '../src/product/product.service';
import { ProductRepository } from '../src/product/product.repo';

describe('Product Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({ ...databaseConfig }),
        SequelizeModule.forFeature([
          Product,
          ProductCategory,
          Plan,
          PendingPolicy,
          User,
          Wallet,
          Policy,
        ]),
        ProductModule,
      ],
      providers: [ProductService, ProductRepository],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api/v1');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET product', async () => {
    const id = 'bb3e134a-d720-4ac6-b352-79ccf2c038e7';
    const response = await request(app.getHttpServer()).get(
      `/api/v1/products/${id}`,
    );

    expect(response.status).toEqual(200);
    expect(response.body.message).toBe('Product fetched successfully');
  });
});
