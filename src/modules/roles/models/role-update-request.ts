import { RoleCreateRequest } from '@roles/models/role-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class RoleUpdateRequest extends PartialType(OmitType(RoleCreateRequest, [])) {}
