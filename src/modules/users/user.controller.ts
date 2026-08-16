import { SecurityGuard } from '@security/security.guard';

import { AppRequest } from '@shared/models/app-request';
import { AppResponse } from '@shared/models/app-response';
import { QueryRequest } from '@shared/models/query-request';

import { User } from '@users/models/user';
import { UserCreateRequest } from '@users/models/user-create-request';
import { UserIncludeRequest } from '@users/models/user-include-request';
import { UserRequest } from '@users/models/user-request';
import { UserUpdateRequest } from '@users/models/user-update-request';
import { UserService } from '@users/user.service';

import { Body, Controller, Delete, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { PureAbility } from '@casl/ability';
import { DateTime } from 'luxon';

@UseGuards(SecurityGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Req() request: AppRequest, @Body('data') data: UserCreateRequest): Promise<AppResponse> {
    const requester: User = request.requester;
    const ability: PureAbility = request.ability;
    const time: DateTime = request.time;

    const output: { data: User } = await this.userService.create({
      requester,
      ability,
      time,
      data,
    });

    return {
      success: true,
      data: output.data,
    };
  }

  @Post('search')
  async read(@Req() request: AppRequest, @Query() query: QueryRequest, @Body('include') include: UserIncludeRequest): Promise<AppResponse> {
    const requester: User = request.requester;
    const ability: PureAbility = request.ability;

    const output: { data: User[]; total: number } = await this.userService.read({
      requester,
      ability,
      query,
      include,
    });

    return {
      success: true,
      data: output.data,
      total: output.total,
    };
  }

  @Post('search/:id')
  async readById(@Req() request: AppRequest, @Param('id') id: string, @Body('include') include: UserIncludeRequest): Promise<AppResponse> {
    const requester: User = request.requester;
    const ability: PureAbility = request.ability;

    const output: { data: User } = await this.userService.readById({
      requester,
      ability,
      id,
      include,
    });

    return {
      success: true,
      data: output.data,
    };
  }

  @Put(':id')
  async update(@Req() request: AppRequest, @Param('id') id: string, @Body('newData') newData: UserUpdateRequest, @Body('oldData') oldData: UserRequest): Promise<AppResponse> {
    const requester: User = request.requester;
    const ability: PureAbility = request.ability;
    const time: DateTime = request.time;

    const output: { data: User } = await this.userService.update({
      requester,
      ability,
      time,
      id,
      newData,
      oldData,
    });

    return {
      success: true,
      data: output.data,
    };
  }

  @Delete()
  async delete(@Req() request: AppRequest, @Param('id') id: string): Promise<AppResponse> {
    const ability: PureAbility = request.ability;

    const output: { data: User } = await this.userService.delete({
      ability,
      id,
    });

    return {
      success: true,
      data: output.data,
    };
  }
}
