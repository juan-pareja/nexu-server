import { Opportunity } from '@opportunities/models/opportunity';
import { OpportunityCommentLog } from '@opportunities/models/opportunity-comment-log';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class OpportunityComment {
  id: string;
  comment: string;
  tenantId: string | null;
  tenant?: Tenant | null;
  opportunityId: string | null;
  opportunity?: Opportunity | null;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date | null;
  logs?: OpportunityCommentLog[];
}
