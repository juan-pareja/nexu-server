import { OpportunityStatus } from '@generated/prisma/enums';

import { Decimal } from '@prisma/client/runtime/library';

import { Account } from '@accounts/models/account';

import { Contact } from '@contacts/models/contact';

import { Currency } from '@currencies/models/currency';

import { Facility } from '@facilities/models/facility';

import { OpportunityComment } from '@opportunities/models/opportunity-comment';
import { OpportunityLog } from '@opportunities/models/opportunity-log';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

import { Quote } from '@quotes/models/quote';

export class Opportunity {
  id: string;
  title: string;
  status: OpportunityStatus | null;
  forecastDate: Date;
  forecastAmount: Decimal;
  forecastCurrencyId: number;
  forecastCurrency?: Currency;
  ownerId: string;
  owner?: User;
  tenantId: string | null;
  tenant?: Tenant | null;
  accountId: string;
  account?: Account;
  contactId: string;
  contact?: Contact;
  facilityId: string | null;
  facility?: Facility | null;
  closedAt: Date | null;
  closedById: string | null;
  closedBy?: User | null;
  createdAt: Date;
  createdById: string;
  createdBy?: User;
  updatedAt: Date | null;
  updatedById: string | null;
  updatedBy?: User | null;
  quotes?: Quote[];
  comments?: OpportunityComment[];
  logs?: OpportunityLog[];
}
