import { Gender } from '@generated/prisma/client';

import { IsNullable, IsValidDate, TransformLowerCase, TransformTrim, TypeDate } from '@shared/utilities/validator.utility';

import { UserRoleRequest } from '@users/models/user-role-request';

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';

export class UserCreateRequest {
  @TransformTrim()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @TransformTrim()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @TypeDate()
  @IsValidDate()
  @IsNullable()
  @IsOptional()
  birthdate?: Date | null;

  @TransformTrim()
  @IsEnum(Gender)
  @IsNullable()
  @IsOptional()
  gender?: Gender | null;

  @TransformLowerCase()
  @TransformTrim()
  @MinLength(4)
  @IsString()
  username: string;

  @TransformTrim()
  @MinLength(8)
  @IsString()
  password: string;

  @TransformLowerCase()
  @TransformTrim()
  @IsEmail()
  @IsNullable()
  @IsOptional()
  email?: string | null;

  @TransformTrim()
  @IsString()
  @IsNullable()
  @IsOptional()
  phone?: string | null;

  @IsNumber()
  @IsNullable()
  @IsOptional()
  phoneCountryId?: number | null;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isAdministrator?: boolean;

  @IsUUID()
  @IsNullable()
  @IsOptional()
  tenantId?: string | null;

  @Type(() => UserRoleRequest)
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  roles?: UserRoleRequest[];
}
