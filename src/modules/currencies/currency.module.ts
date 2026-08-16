import { CurrencyController } from '@currencies/currency.controller';
import { CurrencyService } from '@currencies/currency.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
