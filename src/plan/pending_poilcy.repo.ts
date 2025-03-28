import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { PendingPolicy } from '../models/pendingPolicy.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PendingPolicyRepository {
  constructor(
    @InjectModel(PendingPolicy)
    private readonly pendingPolicyModel: ModelCtor<PendingPolicy>,
  ) {}

  // create pending policies
  async createPendingPolicies(
    pendingPolicies,
    transaction: Transaction,
  ): Promise<any> {
    return await this.pendingPolicyModel.bulkCreate(pendingPolicies, {
      transaction,
    });
  }

  // get pending policies
  async getPendingPolicies(plan_id: string): Promise<PendingPolicy[]> {
    return await this.pendingPolicyModel.findAll({
      where: { plan_id },
    });
  }

  //get single policy
  async getPendingPolicy(
    pending_policy_id: string,
    plan_id: string,
  ): Promise<any> {
    return await this.pendingPolicyModel.findOne({
      where: { id: pending_policy_id, plan_id },
    });
  }

  // activate pending policies
  async activatePendingPolicy(
    pendingPolicyId: string,
    plan_id: string,
  ): Promise<any> {
    return await this.pendingPolicyModel.update(
      { is_used: 'true' },
      { where: { id: pendingPolicyId, plan_id } },
    );
  }

  // delete pending policy
  async deletePendingPolicy(
    pendingPolicyId: string,
    plan_id: string,
  ): Promise<any> {
    return await this.pendingPolicyModel.update(
      { is_deleted: 'true' },
      { where: { id: pendingPolicyId, plan_id } },
    );
  }
}
