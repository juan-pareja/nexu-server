import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { Role } from '@roles/models/role';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class RoleLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string | null;
  tenantd?: Tenant | null;
  roleId: string;
  roled?: Role;
  executedAt: Date;
  executedById: string;
  executedByd?: User;
}
