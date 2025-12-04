import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { Account } from '@accounts/models/account';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class AccountLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string | null;
  tenantd?: Tenant | null;
  accountId: string;
  accountd?: Account;
  executedAt: Date;
  executedById: string;
  executedByd?: User;
}
