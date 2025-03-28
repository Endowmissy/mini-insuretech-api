import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { okResponseFormat } from '../utils/responses';
import logger from '../config/logger';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}
  @Post('create-plan')
  async createPlan(@Body() planDetails) {
    logger.info(`::: Creating Plan .........`);
    const plan = await this.planService.createPlan(planDetails);
    logger.info(`::: Plan created successfully`);
    return okResponseFormat('Plan created successfully', plan, 201);
  }

  @Get('pending-policies/:plan_id')
  async getPendingPolicies(@Param('plan_id') plan_id: string) {
    logger.info(`::: Fetching Pending Policies .........`);
    const pendingPolicies = await this.planService.getPendingPolicies(plan_id);
    logger.info(`::: Pending Policies fetched successfully`);
    return okResponseFormat(
      'Pending Policies fetched successfully',
      pendingPolicies,
      200,
    );
  }

  @Patch('activate-pending-policy/:pending_policy_id/:plan_id')
  async activatePendingPolicy(
    @Param('pending_policy_id') pending_policy_id: string,
    @Param('plan_id') plan_id: string,
  ) {
    logger.info(`::: Activating Pending Policy .........`);
    const pendingPolicy = await this.planService.activatePendingPolicy(
      pending_policy_id,
      plan_id,
    );
    logger.info(`::: Pending Policy activated successfully`);
    return okResponseFormat(
      'Pending Policy activated successfully',
      pendingPolicy,
      200,
    );
  }

  @Get('activated-policy/:plan_id')
  async activatedPolicies(@Param('plan_id') plan_id: string) {
    logger.info(`::: Fetching activated policies .........`);
    const activatedPolicies = await this.planService.getActivatedPolicies(
      plan_id,
    );
    logger.info(`::: Activated policies fetched successfully`);
    return okResponseFormat(
      'Activated policies fetched successfully',
      activatedPolicies,
      200,
    );
  }
}
