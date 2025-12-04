import { Prisma } from '@generated/prisma/client';

import { Role } from '@roles/models/role';

export class Permission {
  id: string;
  name: string;
  action: string;
  subject: string;
  condition: Prisma.JsonValue | null;
  roles: {
    permissionId: string;
    permission?: Permission;
    roleId: string;
    role?: Role;
  }[];
}
