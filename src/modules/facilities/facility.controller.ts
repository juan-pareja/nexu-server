import { FacilityService } from '@facilities/facility.service';

import { Controller } from '@nestjs/common';

@Controller('facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}
}
