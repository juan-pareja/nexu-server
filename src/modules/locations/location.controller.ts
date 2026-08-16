import { LocationService } from '@locations/location.service';

import { Controller } from '@nestjs/common';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
}
