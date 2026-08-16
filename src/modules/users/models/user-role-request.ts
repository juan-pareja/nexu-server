import { IsUUID } from 'class-validator';

export class UserRoleRequest {
  @IsUUID()
  userId: string;

  @IsUUID()
  roleId: string;
}
