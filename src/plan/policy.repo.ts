import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Policy } from '../models/policy.model';

@Injectable()
export class PolicyRepository {
  constructor(
    @InjectModel(Policy) private readonly policyModel: typeof Policy,
  ) {}

  // add policy number
  async addPolicyNumber(policyDetails): Promise<any> {
    return await this.policyModel.create(policyDetails);
  }

  // get all activated policies
  async getActivatedPolicies(plan_id: string): Promise<any> {
    return await this.policyModel.findOne({
      where: { plan_id },
    });
  }
}
