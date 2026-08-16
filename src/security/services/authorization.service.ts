import { Permission } from '@permissions/models/permission';

import { User } from '@users/models/user';

import { Injectable } from '@nestjs/common';

import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';

@Injectable()
export class AuthorizationService {
  buildAbility({ requester, permissions }: { requester: User; permissions: Permission[] }): { ability: PureAbility } {
    const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);

    if (!requester.isActive || requester.isDeleted) {
      cannot('manage', 'all');
      return {
        ability: build(),
      };
    }

    cannot('update', 'all', ['tenantId', 'createdById', 'createdAt']);

    if (requester.isAdministrator) {
      can('manage', 'all');
      return {
        ability: build(),
      };
    }

    const indexedPermissions: Map<string, Permission> = this.getPermissionsIndexed(permissions).data;

    // Users
    cannot('manage', 'User', { tenantId: { not: requester.tenantId } });
    cannot(['create', 'update'], 'User', ['isActive', 'isAdministrator']);

    if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'manage', subject: 'User', condition: null } }).result) {
      can('manage', 'User');
    } else {
      if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'create', subject: 'User', condition: null } }).result) {
        can('create', 'User');
      }

      if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'read', subject: 'User', condition: null } }).result) {
        can('read', 'User');
      } else if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'read', subject: 'User', condition: { id: '${requester.id}' } } }).result) {
        can('read', 'User', { id: requester.id });
      }

      if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'update', subject: 'User', condition: null } }).result) {
        can('read', 'User');
        can('update', 'User');
      } else if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'update', subject: 'User', condition: { id: '${requester.id}' } } }).result) {
        can('read', 'User', { id: requester.id });
        can('update', 'User', { id: requester.id });
      }

      if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'delete', subject: 'User', condition: null } }).result) {
        can('read', 'User');
        can('delete', 'User');
      } else if (this.checkPermission({ permissions: indexedPermissions, permission: { action: 'delete', subject: 'User', condition: { id: '${requester.id}' } } }).result) {
        can('read', 'User', { id: requester.id });
        can('delete', 'User', { id: requester.id });
      }
    }

    return {
      ability: build(),
    };
  }

  private checkPermission({ permissions, permission }: { permissions: Map<string, Permission>; permission: { action: string; subject: string; condition: unknown } }): { result: boolean } {
    const key: string = this.getPermissionKey(permission).key;

    return {
      result: permissions.has(key),
    };
  }

  private getPermissionKey(permission: Permission | { action: string; subject: string; condition: unknown }): { key: string } {
    return {
      key: `${permission.action}-${permission.subject}-${JSON.stringify(permission.condition)}`,
    };
  }

  private getPermissionsIndexed(permissions: Permission[]): { data: Map<string, Permission> } {
    const indexedPermissions: Map<string, Permission> = new Map();

    permissions.forEach((permission: Permission): void => {
      indexedPermissions.set(this.getPermissionKey(permission).key, permission);
    });

    return {
      data: indexedPermissions,
    };
  }
}
