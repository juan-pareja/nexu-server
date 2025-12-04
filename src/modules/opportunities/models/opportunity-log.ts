import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { Opportunity } from '@opportunities/models/opportunity';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class OpportunityLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string | null;
  tenantd?: Tenant | null;
  opportunityId: string;
  opportunityd?: Opportunity;
  executedAt: Date;
  executedById: string;
  executedByd?: User;
}
