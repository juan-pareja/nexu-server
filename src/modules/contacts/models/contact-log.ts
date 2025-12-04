import { Prisma } from '@generated/prisma/client';
import { LogAction } from '@generated/prisma/enums';

import { Contact } from '@contacts/models/contact';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class ContactLog {
  id: string;
  action: LogAction;
  oldValues: Prisma.JsonValue | null;
  newValues: Prisma.JsonValue | null;
  tenantId: string | null;
  tenantd?: Tenant | null;
  contactId: string;
  contactd?: Contact;
  executedAt: Date;
  executedById: string;
  executedByd?: User;
}
