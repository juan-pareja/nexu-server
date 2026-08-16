import { LogAction, Prisma } from '@generated/prisma/client';

import { PrismaService } from '@src/prisma/prisma.service';

import { QueryRequest } from '@shared/models/query-request';
import { compareObjects } from '@shared/utilities/object.utility';

import { tenantSelect } from '@tenants/constants/tenant-select.constant';

import { userSelect } from '@users/constants/user-select.constant';
import { User } from '@users/models/user';
import { UserCreateRequest } from '@users/models/user-create-request';
import { UserIncludeRequest } from '@users/models/user-include-request';
import { UserRequest } from '@users/models/user-request';
import { UserUpdateRequest } from '@users/models/user-update-request';

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { PureAbility, subject } from '@casl/ability';
import { hash } from 'bcrypt';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ requester, ability, time, data }: { requester: User; ability: PureAbility; time: DateTime; data: UserCreateRequest }): Promise<{ data: User }> {
    if (ability.cannot('create', 'User')) {
      throw new ForbiddenException({
        success: false,
      });
    }

    if (
      !this.checkRestrictedFields({
        ability,
        data,
        action: 'create',
      }).result
    ) {
      throw new ForbiddenException({
        success: false,
      });
    }

    const { input }: { input: Prisma.UserCreateInput } = await this.getCreateInput({
      requester,
      data,
      time,
    });

    let output: User;

    try {
      output = await this.prismaService.user.create({
        data: {
          ...input,
        },
        select: userSelect,
      });
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    return {
      data: output,
    };
  }

  async read({ requester, ability, query, include }: { requester: User; ability: PureAbility; query?: QueryRequest; include?: UserIncludeRequest }): Promise<{ data: User[]; total: number }> {
    if (ability.cannot('read', 'User')) {
      throw new ForbiddenException({
        success: false,
      });
    }

    const where: Prisma.UserWhereInput = this.getWhereInput({
      requester,
      ability,
    }).where;

    const whereFiltered: Prisma.UserWhereInput = this.getWhereInputFiltered({
      search: query?.search,
    }).where;

    let output: User[];
    let total: number;

    try {
      [output, total] = await this.prismaService.$transaction([
        this.prismaService.user.findMany({
          select: {
            ...this.getSelect({
              include,
            }).select,
          },
          where: {
            ...where,
            ...whereFiltered,
          },
          ...(query?.limit ? { take: query.limit } : { take: 100 }),
          ...(query?.offset ? { skip: query.offset } : {}),
        }),
        this.prismaService.user.count({
          where: {
            ...where,
            ...whereFiltered,
          },
        }),
      ]);
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    if (!output.length) {
      throw new NotFoundException({
        success: false,
      });
    }

    return {
      data: output,
      total,
    };
  }

  async readById({ requester, ability, id, include }: { requester: User; ability: PureAbility; id: string; include?: UserIncludeRequest }): Promise<{ data: User }> {
    if (ability.cannot('read', subject('User', { id }))) {
      throw new ForbiddenException({
        success: false,
      });
    }

    let output: User | null;

    try {
      output = await this.prismaService.user.findFirst({
        select: {
          ...this.getSelect({
            include,
          }).select,
        },
        where: {
          ...this.getWhereInput({
            requester,
            ability,
          }).where,
          id,
        },
      });
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    if (!output) {
      throw new NotFoundException({
        success: false,
      });
    }

    return {
      data: output,
    };
  }

  async update({
    requester,
    ability,
    time,
    id,
    oldData,
    newData,
  }: {
    requester: User;
    ability: PureAbility;
    time: DateTime;
    id: string;
    oldData: UserRequest;
    newData: UserUpdateRequest;
  }): Promise<{ data: User }> {
    if (ability.cannot('udapte', subject('User', { id }))) {
      throw new ForbiddenException({
        success: false,
      });
    }

    if (
      !this.checkRestrictedFields({
        ability,
        data: newData,
        action: 'update',
      }).result
    ) {
      throw new ForbiddenException({
        success: false,
      });
    }

    let currentData: User;

    try {
      ({ data: currentData } = await this.readById({
        requester,
        ability,
        id,
      }));
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    if (!compareObjects(currentData, oldData)) {
      throw new ForbiddenException({
        success: false,
      });
    }

    const { newValues, oldValues }: { newValues: Partial<User>; oldValues: Partial<User> } = this.getDeltaValues({
      newData: newData,
      currentData: currentData,
    });

    let output: User;

    try {
      [output] = await this.prismaService.$transaction([
        this.prismaService.user.update({
          where: {
            id,
          },
          data: {
            ...this.getUpdateInput({
              requester,
              data: newData,
              time,
            }).input,
            updatedAt: time.toJSDate(),
            updatedBy: {
              connect: {
                id: requester.id,
              },
            },
          },
          select: userSelect,
        }),
        this.prismaService.userLog.create({
          data: this.getLogCreateInput({
            requester,
            time,
            id,
            newValues: newValues as Prisma.JsonObject,
            oldValues: oldValues as Prisma.JsonObject,
            action: 'update',
          }).input,
        }),
      ]);
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    return {
      data: output,
    };
  }

  async delete({ ability, id }: { ability: PureAbility; id: string }): Promise<{ data: User }> {
    if (ability.cannot('delete', subject('User', { id }))) {
      throw new ForbiddenException({
        success: false,
      });
    }

    let output: User;

    try {
      output = await this.prismaService.user.delete({
        where: {
          id,
        },
        select: userSelect,
      });
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    return { data: output };
  }

  private async getCreateInput({ requester, time, data }: { requester: User; time: DateTime; data: UserCreateRequest }): Promise<{ input: Prisma.UserCreateInput }> {
    let passwordHashed: string;

    try {
      passwordHashed = await hash(data.password, 16);
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    const input: Prisma.UserCreateInput = {
      id: v4(),
      firstName: data.firstName,
      lastName: data.lastName,
      birthdate: data.birthdate,
      gender: data.gender,
      username: data.username,
      password: passwordHashed,
      email: data.email,
      phone: data.phone,
      isActive: data.isActive,
      isAdministrator: data.isAdministrator,
      ...(data.phoneCountryId
        ? {
            phoneCountry: {
              connect: {
                id: data.phoneCountryId,
              },
            },
          }
        : {}),
      ...(data.tenantId !== undefined
        ? data.tenantId !== null
          ? {
              tenant: {
                connect: {
                  id: data.tenantId,
                },
              },
            }
          : {}
        : requester.tenantId !== null
          ? {
              tenant: {
                connect: {
                  id: requester.tenantId,
                },
              },
            }
          : {}),
      ...(data.roles
        ? {
            roles: {
              create: data.roles?.map((role) => ({
                role: {
                  connect: {
                    id: role.roleId,
                  },
                },
              })),
            },
          }
        : {}),
      createdAt: time.toJSDate(),
      createdBy: {
        connect: {
          id: requester.id,
        },
      },
    };

    return {
      input,
    };
  }

  private getUpdateInput({ requester, time, data }: { requester: User; time: DateTime; data: UserUpdateRequest }): { input: Prisma.UserUpdateInput } {
    const input: Prisma.UserUpdateInput = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthdate: data.birthdate,
      gender: data.gender,
      username: data.username,
      email: data.email,
      phone: data.phone,
      isActive: data.isActive,
      isAdministrator: data.isAdministrator,
      ...(data.phoneCountryId
        ? {
            phoneCountry: {
              connect: {
                id: data.phoneCountryId,
              },
            },
          }
        : {}),
      ...(data.roles
        ? {
            roles: {
              deleteMany: {},
              create: data.roles?.map((role) => ({
                role: {
                  connect: {
                    id: role.roleId,
                  },
                },
              })),
            },
          }
        : {}),
      updatedAt: time.toJSDate(),
      updatedBy: {
        connect: {
          id: requester.id,
        },
      },
    };

    return {
      input,
    };
  }

  private getLogCreateInput({
    requester,
    time,
    id,
    newValues,
    oldValues,
    action,
  }: {
    requester: User;
    time: DateTime;
    id: string;
    newValues: Prisma.JsonObject;
    oldValues: Prisma.JsonObject;
    action: LogAction;
  }): {
    input: Prisma.UserLogCreateInput;
  } {
    const input: Prisma.UserLogCreateInput = {
      id: v4(),
      action: action,
      oldValues: oldValues,
      newValues: newValues,
      user: {
        connect: {
          id,
        },
      },
      executedAt: time.toJSDate(),
      executedBy: {
        connect: {
          id: requester.id,
        },
      },
    };

    return {
      input,
    };
  }

  private getSelect({ include }: { include?: UserIncludeRequest }): { select: Prisma.UserSelect } {
    const select: Prisma.UserSelect = {
      ...userSelect,
      ...(include?.tenant ? { tenant: { select: tenantSelect } } : {}),
      ...(include?.createdBy ? { createdBy: { select: userSelect } } : {}),
      ...(include?.updatedBy ? { updatedBy: { select: userSelect } } : {}),
    };

    return {
      select,
    };
  }

  private getWhereInput({ requester, ability }: { requester: User; ability: PureAbility }): { where: Prisma.UserWhereInput } {
    const where: Prisma.UserWhereInput = {};

    if (ability.can('manage', 'User')) {
      return {
        where,
      };
    }

    where.tenantId = requester.tenantId;

    return {
      where,
    };
  }

  private getWhereInputFiltered({ search }: { search?: string }): { where: Prisma.UserWhereInput } {
    if (typeof search !== 'string')
      return {
        where: {},
      };

    const terms: string[] = search.split(/\s+/);

    return {
      where: {
        OR: terms.flatMap((term) => [
          { firstName: { startsWith: term, mode: 'insensitive' } },
          { lastName: { startsWith: term, mode: 'insensitive' } },
          { username: { startsWith: term, mode: 'insensitive' } },
          { email: { startsWith: term, mode: 'insensitive' } },
        ]),
      },
    };
  }

  private getDeltaValues({ newData, currentData }: { newData: UserUpdateRequest; currentData: User }): { newValues: Partial<User>; oldValues: Partial<User> } {
    const newValues: Partial<User> = {};
    const oldValues: Partial<User> = {};

    (Object.keys(newData) as Array<keyof UserUpdateRequest>).forEach((key) => {
      const newValue = newData[key];
      const oldValue = currentData[key];

      if (!compareObjects(newValue, oldValue)) {
        (newValues as Record<string, any>)[key] = newValue;
        (oldValues as Record<string, any>)[key] = oldValue;
      }
    });

    return {
      newValues,
      oldValues,
    };
  }

  private checkRestrictedFields({ ability, data, action }: { ability: PureAbility; data: UserCreateRequest | UserUpdateRequest; action: 'create' | 'update' }): { result: boolean } {
    if ('isAdministrator' in data && ability.cannot(action, 'User', 'isAdministrator')) {
      throw new ForbiddenException({
        success: false,
      });
    }

    if ('isActive' in data && ability.cannot(action, 'User', 'isActive')) {
      throw new ForbiddenException({
        success: false,
      });
    }

    if ('tenantId' in data && ability.cannot(action, 'User', 'tenantId')) {
      throw new ForbiddenException({
        success: false,
      });
    }

    return {
      result: true,
    };
  }
}
