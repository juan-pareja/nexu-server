import { AuthenticationCredentialRequest } from '@security/models/authentication-credential-request';
import { SecurityGuard } from '@security/security.guard';
import { AuthenticationService } from '@security/services/authentication.service';

import { AppRequest } from '@shared/models/app-request';
import { AppResponse } from '@shared/models/app-response';

import { Permission } from '@permissions/models/permission';

import { User } from '@users/models/user';

import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Response } from 'express';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(SecurityGuard)
  @Get()
  refresh(@Req() request: AppRequest): AppResponse {
    const requester: User = request.requester;
    const permissions: Permission[] = request.permissions;

    return {
      success: true,
      requester: requester,
      permissions: permissions,
    };
  }

  @Post('login')
  async logIn(@Body('credential') credential: AuthenticationCredentialRequest, @Res({ passthrough: true }) response: Response): Promise<AppResponse> {
    const { data: requester }: { data: User } = await this.authenticationService.getRequesterByUserName({
      username: credential.username,
      withPassword: true,
    });

    await this.authenticationService.validatePassword({
      requester,
      credential,
    });

    delete requester.password;

    const { token }: { token: string } = await this.authenticationService.generateToken({
      payload: {
        sub: requester.id,
      },
    });

    response.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: this.configService.get('COOKIE_EXPIRATION_TIME', 60 * 60 * 1000),
    });

    return {
      success: true,
      requester: requester,
    };
  }

  @Post('logout')
  logOut(@Res({ passthrough: true }) response: Response): AppResponse {
    response.clearCookie('token');

    return {
      success: true,
    };
  }
}
