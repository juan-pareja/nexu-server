import { Gender } from '@generated/prisma/client';

import { Account } from '@accounts/models/account';
import { AccountLog } from '@accounts/models/account-log';

import { Contact } from '@contacts/models/contact';
import { ContactLog } from '@contacts/models/contact-log';

import { Facility } from '@facilities/models/facility';
import { FacilityLog } from '@facilities/models/facility-log';

import { Country } from '@locations/models/country';

import { Opportunity } from '@opportunities/models/opportunity';
import { OpportunityComment } from '@opportunities/models/opportunity-comment';
import { OpportunityCommentLog } from '@opportunities/models/opportunity-comment-log';
import { OpportunityLog } from '@opportunities/models/opportunity-log';

import { Role } from '@roles/models/role';
import { RoleLog } from '@roles/models/role-log';

import { Tenant } from '@tenants/models/tenant';
import { TenantLog } from '@tenants/models/tenant-log';

import { UserLog } from '@users/models/user-log';

import { Quote } from '@quotes/models/quote';
import { QuoteLog } from '@quotes/models/quote-log';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: Date | null;
  gender: Gender | null;
  username: string;
  password?: string;
  email: string | null;
  phone: string | null;
  phoneCountryId: number | null;
  phoneCountry?: Country | null;
  isActive: boolean;
  isDeleted: boolean;
  isAdministrator: boolean;
  tenantId: string | null;
  tenant?: Tenant | null;
  createdAt: Date;
  createdById: string | null;
  createdBy?: User | null;
  usersCreated?: User[];
  updatedAt: Date | null;
  updatedById: string | null;
  updatedBy?: User | null;
  usersUpdated?: User[];
  userLogsExecuted?: UserLog[];
  logs?: UserLog[];
  tenantsCreatedBy?: Tenant[];
  tenantsUpdatedBy?: Tenant[];
  tenantLogsExecuted?: TenantLog[];
  accountsCreated?: Account[];
  accountsUpdated?: Account[];
  accountLogsExecuted?: AccountLog[];
  contactsCreated?: Contact[];
  contactsUpdated?: Contact[];
  contactLogsExecuted?: ContactLog[];
  facilitiesCreated?: Facility[];
  facilitiesUpdated?: Facility[];
  facilityLogsExecuted?: FacilityLog[];
  opportunitiesOwned?: Opportunity[];
  opportunitiesClosed?: Opportunity[];
  opportunitiesCreated?: Opportunity[];
  opportunitiesUpdated?: Opportunity[];
  opportunityLogsExecuted?: OpportunityLog[];
  opportunityComments?: OpportunityComment[];
  opportunityCommentLogsExecuted?: OpportunityCommentLog[];
  rolesCreated?: Role[];
  rolesUpdated?: Role[];
  roleLogsExecuted?: RoleLog[];
  roles?: {
    userId: string;
    user?: User;
    roleId: string;
    role?: Role;
  }[];
  quotesCreated?: Quote[];
  quotesUpdated?: Quote[];
  quoteLogsExecuted?: QuoteLog[];
}
