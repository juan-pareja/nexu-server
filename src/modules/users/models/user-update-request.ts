import { UserCreateRequest } from '@users/models/user-create-request';

import { OmitType, PartialType } from '@nestjs/mapped-types';

import { IsBoolean, IsOptional } from 'class-validator';

export class UserUpdateRequest extends PartialType(OmitType(UserCreateRequest, ['tenantId', 'password'])) {
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
