import { OpportunityController } from '@opportunities/opportunity.controller';
import { OpportunityService } from '@opportunities/opportunity.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [OpportunityController],
  providers: [OpportunityService],
})
export class OpportunityModule {}
