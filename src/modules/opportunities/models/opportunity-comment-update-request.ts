import { OpportunityCommentCreateRequest } from '@opportunities/models/opportunity-comment-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class OpportunityCommentUpdateRequest extends PartialType(OmitType(OpportunityCommentCreateRequest, [])) {}
