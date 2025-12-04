import { Gender } from '@generated/prisma/enums';

import { Account } from '@accounts/models/account';

import { ContactLog } from '@contacts/models/contact-log';

import { Facility } from '@facilities/models/facility';

import { Country } from '@locations/models/country';

import { Opportunity } from '@opportunities/models/opportunity';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

import { Quote } from '@quotes/models/quote';

export class Contact {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  phone: string;
  phoneCountryId: number;
  phoneCountry: Country;
  tenantId: string | null;
  tenant?: Tenant | null;
  accountId: string;
  account?: Account;
  facilityId: string | null;
  facility?: Facility | null;
  createdAt: Date;
  createdById: string;
  createdBy?: User;
  updatedAt: Date | null;
  updatedById: string | null;
  updatedBy?: User | null;
  opportunities?: Opportunity[];
  quotes?: Quote[];
  logs?: ContactLog[];
}
