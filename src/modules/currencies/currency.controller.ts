import { SecurityGuard } from '@security/security.guard';

import { AppRequest } from '@shared/models/app-request';
import { AppResponse } from '@shared/models/app-response';

import { CurrencyService } from '@currencies/currency.service';
import { Currency } from '@currencies/models/currency';

import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { PureAbility } from '@casl/ability';

@UseGuards(SecurityGuard)
@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async read(@Req() request: AppRequest): Promise<AppResponse> {
    const ability: PureAbility = request.ability;

    const output: { data: Currency[] } = await this.currencyService.read({
      ability,
    });

    return {
      success: true,
      data: output.data,
    };
  }
}
