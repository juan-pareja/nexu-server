import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class UserLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string | null;
  tenant?: Tenant | null;
  userId: string;
  user?: User;
  executedAt: Date;
  executedById: string;
  executedBy?: User;
}
