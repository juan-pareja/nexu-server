import { Prisma } from '@generated/prisma/client';

export const permissionSelect: Prisma.PermissionSelect = {
  id: true,
  name: true,
  action: true,
  subject: true,
  condition: true,
  roles: {
    select: {
      permissionId: true,
      roleId: true,
    },
  },
};
