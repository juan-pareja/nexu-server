import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { Facility } from '@facilities/models/facility';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class FacilityLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string | null;
  tenantd?: Tenant | null;
  facilityId: string;
  facilityd?: Facility;
  executedAt: Date;
  executedById: string;
  executedByd?: User;
}
