import { OpportunityCreateRequest } from '@opportunities/models/opportunity-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class OpportunityUpdateRequest extends PartialType(OmitType(OpportunityCreateRequest, ['tenantId'])) {}
