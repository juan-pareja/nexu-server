import { Gender } from '@generated/prisma/enums';

import { IsNullable, IsValidDate, TypeDate } from '@shared/utilities/validator.utility';

import { UserRoleRequest } from '@users/models/user-role-request';

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';

export class UserRequest {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @TypeDate()
  @IsValidDate()
  @IsNullable()
  birthdate: Date | null;

  @IsEnum(Gender)
  @IsNullable()
  gender: Gender | null;

  @MinLength(4)
  @IsString()
  username: string;

  @IsEmail()
  @IsNullable()
  email: string | null;

  @IsString()
  @IsNullable()
  phone: string | null;

  @IsNumber()
  @IsNullable()
  phoneCountryId: number | null;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsBoolean()
  isAdministrator: boolean;

  @IsUUID()
  @IsNullable()
  tenantId: string | null;

  @TypeDate()
  @IsValidDate()
  createdAt: Date;

  @IsUUID()
  @IsNullable()
  createdById: string | null;

  @TypeDate()
  @IsValidDate()
  @IsNullable()
  updatedAt: Date | null;

  @IsUUID()
  @IsNullable()
  updatedById: string | null;

  @Type(() => UserRoleRequest)
  @ValidateNested({ each: true })
  @IsArray()
  roles: UserRoleRequest[];
}
