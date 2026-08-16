import { IsBoolean, IsOptional } from 'class-validator';

export class UserIncludeRequest {
  @IsOptional()
  @IsBoolean()
  phoneCountry?: boolean;

  @IsBoolean()
  @IsOptional()
  tenant?: boolean;

  @IsBoolean()
  @IsOptional()
  createdBy?: boolean;

  @IsBoolean()
  @IsOptional()
  usersCreated?: boolean;

  @IsBoolean()
  @IsOptional()
  updatedBy?: boolean;

  @IsBoolean()
  @IsOptional()
  usersUpdated?: boolean;

  @IsBoolean()
  @IsOptional()
  tenantsCreatedBy?: boolean;

  @IsBoolean()
  @IsOptional()
  tenantsUpdatedBy?: boolean;

  @IsBoolean()
  @IsOptional()
  accountsCreated?: boolean;

  @IsBoolean()
  @IsOptional()
  accountsUpdated?: boolean;

  @IsBoolean()
  @IsOptional()
  contactsCreated?: boolean;

  @IsBoolean()
  @IsOptional()
  contactsUpdated?: boolean;

  @IsBoolean()
  @IsOptional()
  facilitiesCreated?: boolean;

  @IsBoolean()
  @IsOptional()
  facilitiesUpdated?: boolean;

  @IsBoolean()
  @IsOptional()
  opportunitiesClosed?: boolean;

  @IsBoolean()
  @IsOptional()
  opportunitiesCreated?: boolean;

  @IsBoolean()
  @IsOptional()
  opportunitiesUpdated?: boolean;

  @IsBoolean()
  @IsOptional()
  opportunitiesOwned?: boolean;

  @IsBoolean()
  @IsOptional()
  opportunityComments?: boolean;

  @IsBoolean()
  @IsOptional()
  rolesCreated?: boolean;

  @IsBoolean()
  @IsOptional()
  rolesUpdated?: boolean;

  @IsBoolean()
  @IsOptional()
  quotesCreated?: boolean;

  @IsBoolean()
  @IsOptional()
  quotesUpdated?: boolean;

  @IsBoolean()
  @IsOptional()
  roles?: boolean;

  @IsBoolean()
  @IsOptional()
  logs?: boolean;

  @IsBoolean()
  @IsOptional()
  userLogsExecuted?: boolean;

  @IsBoolean()
  @IsOptional()
  opportunityLogsExecuted?: boolean;

  @IsBoolean()
  @IsOptional()
  opportunityCommentLogsExecuted?: boolean;
}
