import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class TenantLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string;
  tenant?: Tenant;
  executedAt: Date;
  executedById: string;
  executedBy?: User;
}
