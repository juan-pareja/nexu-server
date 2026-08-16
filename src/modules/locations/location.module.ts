import { LocationController } from '@locations/location.controller';
import { LocationService } from '@locations/location.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
