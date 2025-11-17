import { OpportunityService } from '@opportunities/opportunity.service';

import { Controller } from '@nestjs/common';

@Controller('opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}
}
