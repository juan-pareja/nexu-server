import { Prisma } from '@generated/prisma/client';

export const userSelect: Prisma.UserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  birthdate: true,
  gender: true,
  username: true,
  email: true,
  phone: true,
  phoneCountryId: true,
  isActive: true,
  isDeleted: true,
  isAdministrator: true,
  tenantId: true,
  createdAt: true,
  createdById: true,
  updatedAt: true,
  updatedById: true,
  roles: {
    select: {
      userId: true,
      roleId: true,
    },
  },
};
