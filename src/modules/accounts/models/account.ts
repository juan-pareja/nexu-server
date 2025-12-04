import { AccountLog } from '@accounts/models/account-log';

import { Contact } from '@contacts/models/contact';

import { Facility } from '@facilities/models/facility';

import { Country } from '@locations/models/country';

import { Opportunity } from '@opportunities/models/opportunity';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

import { Quote } from '@quotes/models/quote';

export class Account {
  id: string;
  name: string;
  tenantId: string | null;
  tenant?: Tenant | null;
  countryId: number | null;
  country?: Country | null;
  createdAt: Date;
  createdById: string;
  createdBy?: User;
  updatedAt: Date | null;
  updatedById: string | null;
  updatedBy?: User | null;
  contacts?: Contact[];
  facilities?: Facility[];
  opportunities?: Opportunity[];
  quotes?: Quote[];
  logs?: AccountLog[];
}
