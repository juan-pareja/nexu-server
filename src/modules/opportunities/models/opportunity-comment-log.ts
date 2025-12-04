import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { OpportunityComment } from '@opportunities/models/opportunity-comment';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class OpportunityCommentLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string | null;
  tenantd?: Tenant | null;
  opportunityCommentId: string;
  opportunityCommentd?: OpportunityComment;
  executedAt: Date;
  executedById: string;
  executedByd?: User;
}
