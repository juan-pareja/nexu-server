import { Prisma } from '@generated/prisma/client';

export const userLogSelect: Prisma.UserLogSelect = {
  id: true,
  action: true,
  oldValues: true,
  newValues: true,
  tenantId: true,
  userId: true,
  executedAt: true,
  executedById: true,
};
