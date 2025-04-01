import { Module } from '@nestjs/common';
import { ProductRepository } from '../product/product.repo';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { WinstonModule } from 'nest-winston';
import logger from '../config/logger';
import { Plan } from '../models/plan.model';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repo';
import { PendingPolicy } from '../models/pendingPolicy.model';
import { User } from '../models/user.model';
import { Wallet } from '../models/wallet.model';
import { Policy } from '../models/policy.model';
import { PendingPolicyRepository } from './pending_poilcy.repo';
import { PolicyRepository } from './policy.repo';
import { UserRepository } from '../user/user.repo';
import { WalletRepository } from '../user/wallet.repo';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Plan,
      PendingPolicy,
      User,
      Wallet,
      Policy,
      Product,
    ]),
    WinstonModule.forRoot(logger),
  ],
  controllers: [PlanController],
  providers: [
    PlanService,
    ProductRepository,
    PlanRepository,
    PendingPolicyRepository,
    PolicyRepository,
    UserRepository,
    WalletRepository,
  ],
})
export class PlanModule {}
