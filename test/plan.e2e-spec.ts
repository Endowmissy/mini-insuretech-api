import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PlanModule } from '../src/plan/plan.module';
import { PendingPolicy } from '../src/models/pendingPolicy.model';
import { databaseConfig } from '../src/config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from '../src/models/plan.model';
import { User } from '../src/models/user.model';
import { Wallet } from '../src/models/wallet.model';
import { Policy } from '../src/models/policy.model';
import { Product } from '../src/models/product.model';
import { PlanService } from '../src/plan/plan.service';
import { ProductRepository } from '../src/product/product.repo';
import { PlanRepository } from '../src/plan/plan.repo';
import { PendingPolicyRepository } from '../src/plan/pending_poilcy.repo';
import { PolicyRepository } from '../src/plan/policy.repo';
import { UserRepository } from '../src/user/user.repo';
import { WalletRepository } from '../src/user/wallet.repo';
import { ProductCategory } from '../src/models/productCategory.model';

describe('Plan Tests', () => {
  let app: INestApplication;
  let planId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({ ...databaseConfig }),
        PlanModule,
        SequelizeModule.forFeature([
          Plan,
          Product,
          PendingPolicy,
          User,
          Wallet,
          Policy,
          ProductCategory,
        ]),
      ],
      providers: [
        PlanService,
        ProductRepository,
        PlanRepository,
        PendingPolicyRepository,
        PolicyRepository,
        UserRepository,
        WalletRepository,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST create plan', async () => {
    const response = await request(app.getHttpServer())
      .post(`/api/v1/plans/create-plan`)
      .set('Content-Type', 'application/json')
      .send({
        user_id: '7b169f98-f0b7-4a09-b0da-edc6ee073acd',
        amount: 30000,
        product_id: '91431c04-ec4d-4642-b6ff-a8f8dea33dcd',
        no_of_products: 3,
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Plan created successfully');

    planId = response.body.data.id;
  });

  it('/GET list pending policies', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/v1/plans/pending-policies/${planId}`)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Pending Policies fetched successfully');
  });

  it('/PATCH activate pending policies', async () => {
    const pendingPolicy = await PendingPolicy.findOne({
      where: { plan_id: planId },
    });

    const response = await request(app.getHttpServer())
      .patch(
        `/api/v1/plans/activate-pending-policy/${pendingPolicy.id}/${planId}`,
      )
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Pending Policy activated successfully');
  });

  it('/GET list activated policies', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/v1/plans/activated-policy/${planId}`)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Activated policies fetched successfully',
    );
  });
});
