import { TenantService } from '@tenants/tenant.service';

import { Controller } from '@nestjs/common';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
}
