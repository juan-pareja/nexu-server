import { TenantController } from '@tenants/tenant.controller';
import { TenantService } from '@tenants/tenant.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
