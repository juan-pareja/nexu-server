import { PrismaService } from '@src/prisma/prisma.service';

import { AuthenticationCredentialRequest } from '@security/models/authentication-credential-request';
import { AuthenticationToken } from '@security/models/authentication-token';

import { permissionSelect } from '@permissions/constants/permission-select.constant';
import { Permission } from '@permissions/models/permission';

import { userSelect } from '@users/constants/user-select.constant';
import { User } from '@users/models/user';

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async getRequesterById({ id, withPassword }: { id: string; withPassword?: boolean }): Promise<{ data: User }> {
    let output: User | null;

    try {
      output = await this.prismaService.user.findUnique({
        select: {
          ...userSelect,
          ...(withPassword ? { password: true } : {}),
        },
        where: {
          id,
        },
      });
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    if (!output)
      throw new NotFoundException({
        success: false,
      });

    return {
      data: output,
    };
  }

  async getRequesterByUserName({ username, withPassword }: { username: string; withPassword?: boolean }): Promise<{ data: User }> {
    let output: User | null;

    try {
      output = await this.prismaService.user.findUnique({
        select: {
          ...userSelect,
          ...(withPassword ? { password: true } : {}),
        },
        where: {
          username,
        },
      });
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    if (!output)
      throw new NotFoundException({
        success: false,
      });

    return {
      data: output,
    };
  }

  async getPermissions({ requester }: { requester: User }): Promise<{ data: Permission[] }> {
    let output: Permission[] = [];

    try {
      output = await this.prismaService.permission.findMany({
        select: {
          ...permissionSelect,
        },
        where: {
          roles: {
            some: {
              role: {
                users: {
                  some: {
                    userId: requester.id,
                  },
                },
              },
            },
          },
        },
        distinct: ['id'],
      });
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    if (!output)
      throw new NotFoundException({
        success: false,
      });

    return {
      data: output,
    };
  }

  async validatePassword({ requester, credential }: { requester: User; credential: AuthenticationCredentialRequest }): Promise<{ result: boolean }> {
    let isValid: boolean;

    try {
      isValid = await compare(credential.password, requester.password!);
    } catch {
      throw new InternalServerErrorException({
        success: false,
      });
    }

    if (!isValid)
      throw new BadRequestException({
        success: false,
      });

    return {
      result: isValid,
    };
  }

  async generateToken({ payload }: { payload: AuthenticationToken }): Promise<{ token: string }> {
    let token: string;

    try {
      token = await this.jwtService.signAsync(payload);
    } catch {
      throw new InternalServerErrorException({
        success: false,
      });
    }

    return {
      token,
    };
  }

  async validateToken({ token }: { token: string }): Promise<{ payload: AuthenticationToken }> {
    let payload: AuthenticationToken;

    try {
      payload = await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException({
        success: false,
      });
    }

    return {
      payload: payload,
    };
  }
}
