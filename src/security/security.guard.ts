import { AuthenticationToken } from '@security/models/authentication-token';
import { AuthenticationService } from '@security/services/authentication.service';
import { AuthorizationService } from '@security/services/authorization.service';

import { AppRequest } from '@shared/models/app-request';

import { Permission } from '@permissions/models/permission';

import { User } from '@users/models/user';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { PureAbility } from '@casl/ability';
import { DateTime } from 'luxon';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AppRequest = context.switchToHttp().getRequest();

    request.time = DateTime.now();

    const token: string = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException({
        success: false,
      });
    }

    const { payload }: { payload: AuthenticationToken } = await this.authenticationService.validateToken({
      token,
    });

    const { data: requester }: { data: User } = await this.authenticationService.getRequesterById({
      id: payload.sub,
    });
    const { data: permissions }: { data: Permission[] } = await this.authenticationService.getPermissions({
      requester,
    });

    const ability: PureAbility = this.authorizationService.buildAbility({
      requester,
      permissions,
    }).ability;

    request.requester = requester;
    request.permissions = permissions;
    request.ability = ability;

    return true;
  }
}
