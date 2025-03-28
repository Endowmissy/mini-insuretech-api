import { Module } from '@nestjs/common';
import { ProductRepository } from '../product/product.repo';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { WinstonModule } from 'nest-winston';
import logger from '../config/logger';
import { Plan } from 'src/models/plan.model';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repo';
import { PendingPolicy } from 'src/models/pendingPolicy.model';
import { User } from 'src/models/user.model';
import { Wallet } from 'src/models/wallet.model';
import { Policy } from 'src/models/policy.model';
import { PendingPolicyRepository } from './pending_poilcy.repo';
import { PolicyRepository } from './policy.repo';
import { UserRepository } from 'src/user/user.repo';
import { WalletRepository } from 'src/user/wallet.repo';

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
