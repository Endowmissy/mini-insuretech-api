import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Plan } from '../models/plan.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PlanRepository {
  constructor(@InjectModel(Plan) private readonly planModel: typeof Plan) {}
  // create plan
  async createPlan(
    updatedPlanDetails,
    transaction: Transaction,
  ): Promise<Plan> {
    return await this.planModel.create(updatedPlanDetails, { transaction });
  }

  // fetch a plan
  async getPlan(plan_id: string): Promise<Plan> {
    return await this.planModel.findOne({ where: { id: plan_id } });
  }
}
