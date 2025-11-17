import { FacilityController } from '@facilities/facility.controller';
import { FacilityService } from '@facilities/facility.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [FacilityController],
  providers: [FacilityService],
})
export class FacilityModule {}
