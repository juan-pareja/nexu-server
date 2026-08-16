import { FacilityCreateRequest } from '@facilities/models/facility-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class FacilityUpdateRequest extends PartialType(OmitType(FacilityCreateRequest, [])) {}
