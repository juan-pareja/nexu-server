import { UserCreateRequest } from '@users/models/user-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UserUpdateRequest extends PartialType(OmitType(UserCreateRequest, ['tenantId', 'password'])) {}
