import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../product/product.repo';
import logger from '../config/logger';
import { PlanDetailsInterface } from '../interface/plan.interface';
import { UserRepository } from '../user/user.repo';
import { Sequelize } from 'sequelize-typescript';
import { WalletRepository } from 'src/user/wallet.repo';
import { PlanRepository } from './plan.repo';
import { PendingPolicyRepository } from './pending_poilcy.repo';
import { PolicyRepository } from './policy.repo';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlanService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    private readonly walletRepository: WalletRepository,
    private readonly planRepository: PlanRepository,
    private readonly pendingPolicyRepository: PendingPolicyRepository,
    private readonly policyRepository: PolicyRepository,
    private sequelize: Sequelize,
  ) {}

  async createPlan(planDetails: PlanDetailsInterface): Promise<any> {
    const { user_id, amount, product_id, no_of_products } = planDetails;
    const transaction = await this.sequelize.transaction();
    try {
      // check if user exists
      const user = await this.userRepository.getUser(user_id, transaction);
      if (!user) {
        logger.info(`::: User does not exist`);
        throw new NotFoundException(`User does not exist`);
      }
      // check if product exists
      const product = await this.productRepository.getOneProduct(
        product_id,
        transaction,
      );

      if (!product) {
        logger.info(`::: Product does not exist`);
        throw new NotFoundException(`Product does not exist`);
      }
      // check if quantity of product is greater than 0
      if (no_of_products <= 0) {
        logger.info(`::: Atleast one quantity of product must be selected`);
        throw new BadRequestException(
          `Atleast one quantity of product must be selected`,
        );
      }

      const totalAmount = +product.price * no_of_products;
      // check if the incoming amount is equal to expected total amount

      if (amount !== totalAmount) {
        logger.info(`::: Amount is not equal to the expected total amount`);
        throw new BadRequestException(
          `Amount is not equal to the expected total amount`,
        );
      }
      // check if user has sufficient funds
      const { balance } = await this.walletRepository.getUserWallet(
        user_id,
        transaction,
      );

      if (balance < amount) {
        logger.info(`::: You don't have sufficient funds to purchase a plan`);
        throw new BadRequestException(
          `IYou don't have sufficient funds to purchase a plan`,
        );
      }

      const newBalance = +balance - +totalAmount;

      await this.walletRepository.updateWalletBalance(
        user_id,
        newBalance,
        transaction,
      );

      // create plan
      const updatedPlanDetails = {
        user_id,
        product_id,
        no_of_products,
        amount_paid: totalAmount,
      };

      const plan = await this.planRepository.createPlan(
        updatedPlanDetails,
        transaction,
      );

      const pendingPolicies = [];
      for (let i = 0; i < no_of_products; i++) {
        pendingPolicies.push({ plan_id: plan.id, product_id });
      }

      // create pending policies
      await this.pendingPolicyRepository.createPendingPolicies(
        pendingPolicies,
        transaction,
      );
      await transaction.commit();
      return plan;
    } catch (error) {
      await transaction.rollback();
      logger.error(`::: Error occurred while creating a plan: ${error}`);
      throw new ConflictException(`Error occurred while creating a plan`);
    }
  }

  async getPendingPolicies(plan_id: string): Promise<any> {
    return await this.pendingPolicyRepository.getPendingPolicies(plan_id);
  }

  async activatePendingPolicy(pending_policy_id: string, plan_id: string) {
    // check if pending policy exist
    const pendingPolicy = await this.pendingPolicyRepository.getPendingPolicy(
      pending_policy_id,
      plan_id,
    );

    if (!pendingPolicy) {
      logger.info(`::: Pending Policy does not exist`);
      throw new NotFoundException(`Pending Policy does not exist`);
    }

    const activatedPendingPolicy =
      await this.pendingPolicyRepository.activatePendingPolicy(
        pending_policy_id,
        plan_id,
      );

    if (activatedPendingPolicy) {
      const shortPlanId = plan_id.replace(/-/g, '').slice(0, 6).toUpperCase();
      const timestamp = Date.now().toString(36).toUpperCase();
      const PolicyNumber = `POL-${shortPlanId}-${timestamp}`;
      const { user_id, product_id } = await this.planRepository.getPlan(
        plan_id,
      );

      const policyDetails = {
        policy_number: PolicyNumber,
        pending_policy_id,
        product_id,
        user_id,
        plan_id,
      };

      await this.policyRepository.addPolicyNumber(policyDetails);
    }

    await this.pendingPolicyRepository.deletePendingPolicy(
      pending_policy_id,
      plan_id,
    );
  }

  async getActivatedPolicies(plan_id: string) {
    //check if plan exist
    const plan = await this.planRepository.getPlan(plan_id);
    if (!plan) {
      logger.info(`::: Plan does not exist`);
      throw new NotFoundException(`Plan does not exist`);
    }
    return await this.policyRepository.getActivatedPolicies(plan_id);
  }
}
