import { Module } from '@modules/modules/models/module';

import { Account } from '@accounts/models/account';
import { AccountLog } from '@accounts/models/account-log';

import { Contact } from '@contacts/models/contact';
import { ContactLog } from '@contacts/models/contact-log';

import { Facility } from '@facilities/models/facility';
import { FacilityLog } from '@facilities/models/facility-log';

import { Opportunity } from '@opportunities/models/opportunity';
import { OpportunityComment } from '@opportunities/models/opportunity-comment';
import { OpportunityCommentLog } from '@opportunities/models/opportunity-comment-log';
import { OpportunityLog } from '@opportunities/models/opportunity-log';

import { Role } from '@roles/models/role';
import { RoleLog } from '@roles/models/role-log';

import { TenantLog } from '@tenants/models/tenant-log';

import { User } from '@users/models/user';
import { UserLog } from '@users/models/user-log';

import { Quote } from '@quotes/models/quote';
import { QuoteLog } from '@quotes/models/quote-log';

export class Tenant {
  id: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  createdById: string;
  createdBy?: User;
  updatedAt: Date | null;
  updatedById: string | null;
  updatedBy?: User | null;
  users?: User[];
  userLogs?: UserLog[];
  accounts?: Account[];
  accountLogs?: AccountLog[];
  contacts?: Contact[];
  contactLogs?: ContactLog[];
  facilities?: Facility[];
  facilityLogs?: FacilityLog[];
  opportunities?: Opportunity[];
  opportunityLogs?: OpportunityLog[];
  opportunityComments?: OpportunityComment[];
  opportunityCommentLogs?: OpportunityCommentLog[];
  roles?: Role[];
  roleLogs?: RoleLog[];
  quotes?: Quote[];
  quoteLogs?: QuoteLog[];
  modules?: {
    tenantId: string;
    tenants?: Tenant;
    moduleId: string;
    module?: Module;
  }[];
  logs?: TenantLog[];
}
