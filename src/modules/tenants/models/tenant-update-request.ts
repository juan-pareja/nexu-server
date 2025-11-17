import { TenantCreateRequest } from '@tenants/models/tenant-create-request';

import { PartialType } from '@nestjs/mapped-types';

export class TenantUpdateRequest extends PartialType(TenantCreateRequest) {}
