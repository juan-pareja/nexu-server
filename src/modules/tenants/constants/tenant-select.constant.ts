import { Prisma } from '@generated/prisma/client';

export const tenantSelect: Prisma.TenantSelect = {
  id: true,
  name: true,
  createdAt: true,
  createdById: true,
  updatedAt: true,
  updatedById: true,
};
