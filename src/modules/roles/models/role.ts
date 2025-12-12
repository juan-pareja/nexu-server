import { Permission } from '@permissions/models/permission';

import { RoleLog } from '@roles/models/role-log';

import { Tenant } from '@tenants/models/tenant';

import { User } from '@users/models/user';

export class Role {
  id: string;
  name: string;
  tenantId: string | null;
  tenant?: Tenant | null;
  createdAt: Date;
  createdById: string;
  createdBy?: User;
  updatedAt: Date | null;
  updatedById: string | null;
  updatedBy?: User | null;
  permissions?: {
    permissionId: string;
    permission?: Permission;
    roleId: string;
    role?: Role;
  }[];
  users?: {
    userId: string;
    user?: User;
    roleId: string;
    role?: Role;
  }[];
  logs?: RoleLog[];
}
