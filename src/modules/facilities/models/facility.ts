import { Account } from '@accounts/models/account';

import { Contact } from '@contacts/models/contact';

import { FacilityLog } from '@facilities/models/facility-log';

import { Opportunity } from '@opportunities/models/opportunity';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class Facility {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  tenantId: string | null;
  tenant?: Tenant | null;
  accountId: string;
  account?: Account;
  createdAt: Date;
  createdById: string;
  createdBy?: User;
  updatedAt: Date | null;
  updatedById: string | null;
  updatedBy?: User | null;
  contacts?: Contact[];
  opportunities?: Opportunity[];
  logs?: FacilityLog[];
}
