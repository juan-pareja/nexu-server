import { PrismaService } from '@src/prisma/prisma.service';

import { currencySelect } from '@currencies/constants/currency-select.constant';
import { Currency } from '@currencies/models/currency';

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { PureAbility } from '@casl/ability';

@Injectable()
export class CurrencyService {
  constructor(private readonly prismaService: PrismaService) {}

  async read({ ability }: { ability: PureAbility }): Promise<{ data: Currency[] }> {
    if (ability.cannot('read', 'Currency')) {
      throw new ForbiddenException({
        success: false,
      });
    }

    let data: Currency[];

    try {
      data = await this.prismaService.currency.findMany({
        select: currencySelect,
      });
    } catch {
      throw new BadRequestException({
        success: false,
      });
    }

    if (!data) {
      throw new NotFoundException({
        success: false,
      });
    }

    return {
      data: data,
    };
  }
}
